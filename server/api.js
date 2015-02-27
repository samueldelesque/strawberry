var restify = require('restify')
var Mongolian = require('mongolian')
var validator = require('validator')
var extend = require('extend-object')
var forEach = require("for-each")

var server = restify.createServer({
	name: "Strawberry Api"
})
var dbserver = new Mongolian
var db = dbserver.db("strawberry")
var users = db.collection("users")

var port = 3041

server.use(
	function crossOrigin(req,res,next){
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "X-Requested-With")
		return next()
	}
)
server.use(restify.bodyParser())

server.get('/users', function(req, res, next) {
	users.find({},{_id:false,username:true,fullname:true,gender:true,age:true}).limit(120).sort({ created: 1 }).toArray(function (err, array) {
		if(err)console.log("Failed to fetch users",err)
		res.send(array)
		next()
	})
})

server.post('/user/:id', function(req, res, next) {
	console.log("Api::insert user")
	var user = new user_model()
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
	//users.insert({})
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
		var user = new user_model
		extend(user,data)
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

function user_model(){
	this.username = ""
	this.fullname = ""
	this.gender = ""
	this.age = 0

	this.set = function(name,value){
		switch(name){
			case "name":
				if(!validator.isLength(value,3,49))return false
			break
			case "gender":
				if(!validator.isIn(value,["m","f","t"]))return false
			break
			// case "age":
			// 	if(!validator.isIn(value,["m","f","t"]))return false
			// break
		}
		this[name] = value
		return this
	}
	this.get = function(){
		var me = this
		return {
			username: me.username,
			fullname: me.fullname,
			gender: me.gender,
			age: me.age
		}
	}
}

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
	return new user_model()
		.set("username",randomFromArray(fixtures.names).toLowerCase()+"_"+Math.floor(Math.random()*112)+Math.floor(Math.random()*11))
		.set("fullname",randomFromArray(fixtures.names))
		.set("gender",randomFromArray(fixtures.genders))
		.set("age",fixtures.age())
		.set("isDummy", true)
}