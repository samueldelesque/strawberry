angular.module('Strawberry.api',[])

.service('Api', function($http, $q){
	if(!window.Settings||!window.Settings.apiUrl){
		console.error("No API settings provided!");
		return;
	}
	var apiUrl = window.Settings.apiUrl;

	this.login = function(user){
		if(!user)user = {}
		return $http.post(apiUrl+"login",user)
	}
	this.signup = function(user){
		if(!user)user = {}
		return $http.post(apiUrl+"user",user)
	}
	this.update = function(user){
		if(!user)user = {}
		return $http.put(apiUrl+"user",user)
	}
})

module.exports = "Strawberry.api"