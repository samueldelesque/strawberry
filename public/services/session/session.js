(function(){
	'use strict';

	angular.module('Strawberry.session',[])

	.service('Session', function($http, $q){

		var sessionData = {}

		this.set = function(name,value){
			sessionData[name] = value
		}
		this.get = function(name){
			if(sessionData[name])
				return sessionData[name]
			return false
		}
	})
})()