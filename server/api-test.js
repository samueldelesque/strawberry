var restify = require('restify')
var Mongolian = require('mongolian')
var validator = require('validator')
var extend = require('extend-object')
var forEach = require("for-each")


console.log("Test UserModel")
var userModel = require("./models/user.js")

console.log("creating test user")
var testUser = new userModel({fullname: "Henri Test"})
console.log(testUser.fullname)//,testUser.get("fullname"));