var restify = require('restify')
var Mongolian = require('mongolian')
var validator = require('validator')

var chai = require('chai')
var expect = chai.expect;

var basepath = "../server/";


var User = require(basepath+"models/user.js")

describe("User",function(){
	var name = "Robert Henri Mattheus"
	var testUser = new User({fullname: name})
	
	describe("#Get User.get(fullname)",function(){
		it("should be named "+name, function(){
			expect(testUser.get("fullname")).to.equal(name)
		})
	})

	var dbserver = new Mongolian
	var db = dbserver.db("strawberry")
	var users = db.collection("users")

	describe("#Get Users.find()",function(){
		it("should be an array",function(){
			users.find({},{_id:false,username:true,fullname:true,gender:true,age:true}).limit(120).sort({ created: 1 }).toArray(function(err,data){
				expect(err).to.be.a("null")
				expect(data).to.be.an("array")
			})
		})
	})
})