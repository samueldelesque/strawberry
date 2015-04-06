var Restify = require('restify'),
	Sessions = require("sessions"),
	Mongolian = require('mongolian'),
	validator = require('validator'),
	forEach = require("for-each"),

    sessionHandler = new Sessions(),
	userModel = require("./models/user"),
	server = Restify.createServer({
		name: "Strawberry Api"
	}),
	dbserver = new Mongolian,
	db = dbserver.db("strawberry"),
	users = db.collection("users"),
	port = 3041

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
	// var session = sessionHandler.httpRequest(req, res);
	required({password:"string",username:"string"},req,res,next)

	users.findOne({username:req.params.username},{_id:false,username:true,fullname:true,gender:true,age:true,password:true},function(err,user){
		console.log("Finding user",user)
		if(err)res.send({status:404,msg:"Could not find user",error:err})
		if(req.params.password == user.password){
			// session
			res.send({status:200,user:user})
		}
		next()
	})
})

server.post('/user/:id', function(req, res, next) {
	console.log("Api::insert user")
	var user = new userModel()
	user.set("username",req.params.username)
	user.set("fullname",req.params.fullname)
	user.set("gender",req.params.gender)
	user.set("age",req.params.age)

	users.insert(user)
	res.send({status:200,msg:"User inserted",user:user})
	next()
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