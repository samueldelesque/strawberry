angular.module('Strawberry.session',[
	"Strawberry.user"
])

.service('Session', function($http, $q, User){
	var Session = this;
	this.set = function(name,value){
		localStorage.setItem(name,angular.toJson(value))
	}
	this.get = function(name){
		return angular.fromJson(localStorage.getItem(name))
	}
	this.user = function(user){
		if(!user){
			// Get user
			return Session.get("user")
		}
		else{
			// Set user
			Session.set("user",user);
			return user
		}
	}
	this.sessionid = function(sessionid){
		if(!sessionid){
			// Get Sessionid
			return Session.get("sessionid")
		}
		else{
			// Set Sessionid
			Session.set("sessionid",sessionid)
			return sessionid
		}
	}
	this.logout = function(){
		this.set("sessionid",null)
		this.set("user",null)
	}
})

module.exports = "Strawberry.session"