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
	
	describe("#Get(fullname)",function(){
		it("should be named "+name, function(){
			expect(testUser.get("fullname")).to.equal(name)
		})
	})
})