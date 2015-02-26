var restify = require('restify')
var Mongolian = require('mongolian')

var server = restify.createServer()
var dbserver = new Mongolian
var db = dbserver.db("strawberry")
var users = db.collection("users")

var port = 3041

server.get('/users', function(req, res, next) {
	users.find({},{_id:false,"name":true,"gender":true}).limit(100).sort({ created: 1 }).toArray(function (err, array) {
		if(err)console.log("Failed to fetch users",err)
		res.send(array)
		next()
	})
})

server.get('/users/add-dummy', function(req, res, next) {
	users.insert(fixtures)
	res.send({msg: "Fixtures inserted!"})
	next()
})

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
})




/// FIXTURES
var fixtures = 
[
	{
		name: "Henri",
		gender: "m",
		age: 60,
		lookingFor: "lick pussy",
		lookingForGender: "f"
	},
	{
		name: "Margaret",
		gender: "f",
		age: 31,
		lookingFor: "lick pussy",
		lookingForGender: "f"
	},
	{
		name: "Sam & Carlotta",
		gender: "couple",
		age: 24,
		lookingFor: "lick a dick",
		lookingForGender: "m"
	},
	{
		name: "8th st wankers",
		gender: "group",
		age: 44,
		lookingFor: "gang bang",
		lookingForGender: "f"
	},
	{
		name: "SexySushi",
		gender: "group",
		age: 24,
		lookingFor: "gang bang",
		lookingForGender: "any"
	},
	{
		name: "Stephanie",
		gender: "f",
		age: 34,
		lookingFor: "lick a dick",
		lookingForGender: "m"
	},
	{
		name: "Chey",
		gender: "f",
		age: 23,
		lookingFor: "eat cheese",
		lookingForGender: "friends"
	},
	{
		name: "Sam",
		gender: "m",
		age: 23,
		lookingFor: "drink a beer",
		lookingForGender: "m"
	},
	{
		name: "Matthieu",
		gender: "m",
		age: 23,
		lookingFor: "drink a beer",
		lookingForGender: "any"
	},
	{
		name: "Carlotta",
		gender: "f",
		age: 23,
		lookingFor: "lick pussy",
		lookingForGender: "any"
	},
	{
		name: "Jeremy",
		gender: "m",
		age: 24,
		lookingFor: "get married",
		lookingForGender: "f"
	},
	{
		name: "Robert",
		gender: "m",
		age: 24,
		lookingFor: "eat cheese",
		lookingForGender: "any"
	},
	{
		name: "Kelsey",
		gender: "f",
		age: 26,
		lookingFor: "eat cheese",
		lookingForGender: "any"
	},
	{
		name: "Josh",
		gender: "m",
		age: 23,
		lookingFor: "eat tacos",
		lookingForGender: "any"
	},
	{
		name: "Gabriel",
		gender: "m",
		age: 30,
		lookingFor: "drink a beer",
		lookingForGender: "any"
	},
	{
		name: "Brenna",
		gender: "f",
		age: 22,
		lookingFor: "get whipped",
		lookingForGender: "any"
	},
	{
		name: "Angel",
		gender: "m",
		age: 90,
		lookingFor: "get whipped",
		lookingForGender: "m"
	}
]