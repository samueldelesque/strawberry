var Restify = require('restify'),
	// Sessions = require("sessions"),
    Redis = require('redis');
	Mongolian = require('mongolian'),
	ObjectId = require('mongolian').ObjectId,
	validator = require('validator'),
	forEach = require("for-each"),
	Crypto = require('crypto'),

    // sessionHandler = new Sessions(),
	userModel = require("./models/user"),
	server = Restify.createServer({
		name: "Strawberry Api"
	}),
	dbserver = new Mongolian,
	sessionStore = Redis.createClient(6379,"127.0.0.1"),
	db = dbserver.db("strawberry"),
	users = db.collection("users"),
	port = 3041

console.log(new ObjectId())

sessionStore.on('connect', function(err) {
    console.log('connected');

	sessionStore.get("00000001",function(err,data){
		if(err){console.error("Failed to fetch session"); return}
		console.log("SessionData",data)
	})
})

server.use(
	function crossOrigin(req,res,next){
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "X-Requested-With")
		return next()
	}
)
server.use(Restify.bodyParser())

var required = function(fields,req,res,next){
	forEach(fields,function(e,i){
		if(!req.params[i]){
			res.send({status:403,msg:i+" is required!"})
			next()
		}
		else{
			switch(e){
				case "string":
					if(typeof(req.params[i]) != "string" || req.params[i].length < 1){
						res.send({status:403,msg:i+" is not correct (type = "+typeof(req.params[i])+", length = "+req.params[i].length+")!"})
						next()
					}
				break;
			}
		}
	})
}

server.get('/users', function(req, res, next) {
	users.find({},{_id:false,username:true,fullname:true,gender:true,age:true}).limit(120).sort({ created: 1 }).toArray(function (err, array) {
		if(err)console.log("Failed to fetch users",err)
		res.send(array)
		next()
	})
})

server.post('/login',function(req, res, next){
	console.log("Login",req.params)
	// var session = sessionHandler.httpRequest(req, res);
	required({password:"string",email:"string"},req,res,next)

	users.findOne({email:req.params.email},{_id:true,email:true,fullname:true,gender:true,birthdate:true,password:true},function(err,data){
		if(err || !data){res.send({status:404,msg:"Could not find user",error:err});next();return}
		console.log("Attempting user login",req.email,req.password,data.password)
		var user = new userModel(data)
		if(req.params.password == user.get("password")){
			// session
			var userData = user.get()
			delete userData.password
			var now = new Date(),
				tmp = now.getTime() + Math.floor(Math.random()*1000) + 1,
				sessionid = Crypto.createHash('md5').update(tmp.toString()).digest('hex')

			sessionStore.set(sessionid,data._id,function(err,data){
				if(err){console.error("Failed to set session"); res.send({status:403,message:"An error occured"}); next();return;}
				console.log("Session",sessionid,data._id)
				res.send({status:200,user:userData,sessionid:sessionid})
				next()
			})
			
		}
		else{
			res.send({status:301,message:"Invalid email or password"})
		}
		next()
	})
})

server.put('/user', function(req, res, next) {
	console.log("Api::insert user")

	if(!req.params.sessionid){
		console.log("No SessionId passed for update")
		res.send({status:401,msg:"You must pass a sessionid to update user!"})
		next()
		return
	}

	sessionStore.get(req.params.sessionid,function(err,uid){
		var user = new userModel(),
			allowed = user.allowedFields()
		forEach(req.params,function(value,name){
			if(allowed.indexOf(name) > -1)
				user.set(name,value)
		})
		// console.log("Update ",uid,ObjectId)
		users.update({_id:new ObjectId(uid)},{$set:user.get()})
		res.send({status:200,user:user.get()})
		next()
	})
})

server.post('/user', function(req, res, next) {
	console.log("Api::insert user")

	var user = new userModel(),errors=[]
	if(user.set("fullname",req.params.fullname) === false) errors.push("fullname")
	else if(user.set("gender",req.params.gender) === false) errors.push("gender")
	else if(user.set("password",req.params.password) === false) errors.push("password")
	else if(user.set("birthdate",req.params.birthdate) === false) errors.push("birthdate")
	else if(req.params.phone && user.set("phone",req.params.phone) === false) errors.push("phone")
	else if(user.set("email",req.params.email) === false) errors.push("email")
	
	if(errors.length > 0){
		res.send({status:403,msg:"Invalid fields",errors:errors})
		next()
	}
	else{
		console.log(users.find({email:req.params.email}).limit(1));
		if(users.find({email:req.params.email}).limit(1).length > 0){
			res.send({status:403,msg:"An account associated with that email already exist."});return;
		}

		users.insert(user.get())
		res.send({status:200,msg:"User inserted",user:user.get()})
		next()
	}
})

server.get('/user/:id', function(req, res, next) {
	console.log("Api::get user")
	users.findOne({username:req.params.id},{_id:false,username:true,fullname:true,gender:true,age:true},function(err,user){
		if(err)res.send({status:404,msg:"Could not find user",error:err})
		res.send({status:200,user:user})
		next()
	})
})

server.put('/user/:id', function(req, res, next) {
	console.log("Api::update user")
	
	users.findOne({username:req.params.id},function(err,data){
		if(err)res.send({status:404,msg:"Could not find user",error:err})
		var user = new userModel(data)
		
		forEach(req.params,function(e,i){
			user.set(i,e)
		})
		users.update({username:req.params.id},user.get(),function(err,data){
			if(err)res.send({status:404,msg:"Could not update user",error:err})
			res.send({status:200,user:user.get()})
			next()
		})
	})
})

server.get('/fixtures', function(req, res, next) {
	var data = []
	for(i=0;i<100;i++){
		data.push(randomUser())
	}
	users.insert(data)
	res.send({msg: "Fixtures inserted!"})
	next()
})

server.get('/cleanup', function(req, res, next) {
	users.remove({isDummy:true})
	res.send({msg: "Fixtures removed!"})
	next()
})

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url)
})


/* Fake Validator for testing purposes

var validator = {
	isLength: function(){return true},
	isIn: function(){return true}
}

*/


var fixtures = {
	names: ["Henri","Samuel","Carlotta","Josh","Kelsey","Chey","Robert","Margaret","Gabriel","Angel","Jeremy"],
	age: function(){return Math.floor(Math.random() * 80) + 20},
	interests: ["lick pussy","suck dick","lick foot","eat cheese","drink wine","go hiking","watch a movie","make some art","get whipped","whip someone"],
	genders: ["m","f","t"],
}
function randomFromArray(array){
	return array[Math.floor(Math.random() * array.length)]
}
function randomUser(){
	return new userModel()
		.set("username",randomFromArray(fixtures.names).toLowerCase()+"_"+Math.floor(Math.random()*112)+Math.floor(Math.random()*11))
		.set("fullname",randomFromArray(fixtures.names))
		.set("gender",randomFromArray(fixtures.genders))
		.set("age",fixtures.age())
		.set("isDummy", true)
}