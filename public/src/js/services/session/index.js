angular.module('Strawberry.session',[
	"Strawberry.user"
])

.service('Session', function($http, $q, User){
	var Session = this;
	this.set = function(name,value){
		localStorage.setItem(name,value)
	}
	this.get = function(name){
		return localStorage.getItem(name)
	}
	this.user = function(user){
		if(!user){
			// Get user
			var user = Session.get("user");
			if(user != null){
				return angular.fromJson(user)
			}
			return false
		}
		else{
			// Set user
			Session.set("user",angular.toJson(user));
			return user
		}
	}
	this.sessionid = function(sessionid){
		if(!sessionid){
			// Get Sessionid
			var sessionid = Session.get("sessionid");
			return sessionid||false
		}
		else{
			// Set Sessionid
			Session.set("sessionid",sessionid)
			return sessionid
		}
	}
})

module.exports = "Strawberry.session"