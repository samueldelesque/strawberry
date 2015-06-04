var Restify = require('restify'),
	// Sessions = require("sessions"),
	Redis = require('redis'),
	// Mongolian = require('mongolian'),
	Mongoose = require('mongoose'),
	ObjectId = Mongoose.Schema.ObjectId,
	// ObjectId = require('mongolian').ObjectId,
	validator = require('validator'),
	Extend = require('extend'),
	forEach = require("for-each"),
	Crypto = require('crypto'),

	// sessionHandler = new Sessions(),
	User = require("./models/user"),
	server = Restify.createServer({
		name: "Strawberry Api"
	}),
	// dbserver = new Mongolian,
	sessionStore = Redis.createClient(6379,"127.0.0.1"),
	// db = dbserver.db("strawberry"),
	// users = db.collection("users"),
	port = 3041

/*
	Redis Session server
*/
sessionStore.on('connect', function(err) {
    console.log('Session server connected!');
})

/*
	Connect Mongoose to MongoDB
*/
Mongoose.connect('mongodb://127.0.0.1/strawberry')
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {
	console.log("Database server connected!")
})

server.use(Restify.queryParser())
server.use(Restify.bodyParser())
server.use(Restify.CORS())
server.pre(Restify.pre.sanitizePath())

var required = function(fields,req,res,next){
	var errors = []
	forEach(fields,function(e,i){
		if(!req.params[i]){
			errors.push(i)
			// return false
		}
		else{
			switch(e){
				case "string":
					if(typeof(req.params[i]) != "string" || req.params[i].length < 1){
						errors.push(i)
						// return false
					}
				break;
			}
		}
	})
	return errors
}

server.get('/users', function(req, res, next) {
	User.find({}, function (err, users) {
		if(err){
			res.statusCode = 403
			res.send({error:err})
			console.log("Failed to fetch users",err)
			return next()
		}
		else{
			res.send(users)
			return next()
		}
	})
})

server.post('/login',function(req, res, next){
	console.log("Api::login")

	if(!req.params.password || !req.params.identifier){
		res.statusCode = 403
		res.send({msg:"Invalid email or password",error:{name:"missing"}})
		return next()
	}

	// You can pass either a MongoID or phone or Email
	if(Mongoose.Types.ObjectId.isValid(req.params.identifier)){
		var query = {_id:Mongoose.Types.ObjectId(req.params.identifier)}
	}
	else{
		var query = {
			$or:[
				{email:req.params.identifier},
				{phone:req.params.identifier}
			]
		}
	}

	// Find user
	User.findOne(query,function(err,user){
		if(err||!user){
			res.statusCode = 404
			res.send({msg:"Could not find user",error:err})
			return next()
		}
		if(req.params.password == user.password){
			// Hide Password from API
			user.password = ""

			// Build a session id
			var now = new Date(),
				tmp = now.getTime() + Math.floor(Math.random()*1000) + 1,
				sessionid = Crypto.createHash('md5').update(tmp.toString()).digest('hex')

			// Set Session and return user and sessionid
			sessionStore.set(sessionid,user._id,function(err,data){
				if(err){
					res.statusCode = 403
					res.send({msg:"An error occured",error:err})
					return next()
				}
				else{
					res.send({user:user,sessionid:sessionid})
					return next()
				}
			})
			
		}
		else{
			res.statusCode = 401
			res.send({msg:"Invalid email or password"})
			return next()
		}
	})
})

server.post('/user', function(req, res, next) {
	console.log("Api::insert user")

	User.find({$or:[{email:req.params.email},{phone:req.params.phone}]},function(err,data){
		// If the query fails (should not happen)
		if(err){
			res.statusCode = 500
			res.send({msg:"An unknown error occured.",error:err});
			return next()
		}

		// We could just try and save and get the Mongo Save error
		// but its nicer to explicitly check if the user exist to give a clear error
		if(data.length > 0){
			res.statusCode = 403
			res.send({msg:"A user with this email or phone already exists!",error:{name: "existing"}});
			return next()
		}

		// User doesn't exist, let's try and insert him and see if we get validation errors
		var insert = new User(req.params)
		insert.save(function(err,user){
			// Mongoose Validation failed
			if(err){
				res.statusCode = 403
				res.send({msg:"Failed to create user.",error:err});
				return next()
			}

			// Build a session id
			var now = new Date(),
				tmp = now.getTime() + Math.floor(Math.random()*1000) + 1,
				sessionid = Crypto.createHash('md5').update(tmp.toString()).digest('hex')

			// insert session id and return user + sessionid
			sessionStore.set(sessionid,user._id,function(err,data){
				if(err){
					// console.error("Failed to set session")
					res.statusCode = 500
					res.send({msg:"An error occured",error:err})
					return next()
				}
				else{
					// console.log("Session",sessionid,data._id)
					res.send({user:user,sessionid:sessionid})
					return next()
				}
			})
		})
	})
})

server.get('/user/:identifier', function(req, res, next) {
	console.log("Api::get user")

	// You can pass either a MongoID or phone or Email
	if(Mongoose.Types.ObjectId.isValid(req.params.identifier)){
		var query = {_id:Mongoose.Types.ObjectId(req.params.identifier)}
	}
	else{
		var query = {
			$or:[
				{phone:req.params.identifier},
				{email:req.params.identifier}
			]
		}
	}

	User.findOne(query,function(err,user){
		if(err||!user){
			res.statusCode = 404
			res.send({msg:"Could not find user",error:err})
			return next()
		}
		// Hide password from API
		user.password = ""
		res.send({user:user})
		return next()
	})
})

server.put('/user/:identifier', function(req, res, next) {
	console.log("Api::update user")

	// You can pass either a MongoID or phone or Email
	if(Mongoose.Types.ObjectId.isValid(req.params.identifier)){
		var query = {_id:Mongoose.Types.ObjectId(req.params.identifier)}
	}
	else{
		var query = {
			$or:[
				{phone:req.params.identifier},
				{email:req.params.identifier}
			]
		}
	}

	// Try to find mathing user
	User.findOne(query,function(err,user){
		if(err){
			res.statusCode = 404
			res.send({msg:"Could not find user",error:err})
			return next()
		}

		// Recursively replace user properties
		user = Extend(true,user,req.params)

		// Try and save user or return validation errors
		user.save(function(err,data){
			if(err){
				res.statusCode = 403
				res.send({msg:"Failed to update user",error:err})
				return next()
			}

			// Hide password from API
			user.password = ""
			res.send({user:user})
			return next()
		})
	})
})


server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url)
})