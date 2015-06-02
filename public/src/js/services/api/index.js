(function(){
	'use strict';

	angular.module('Strawberry.api',[])

	.service('Api', function($http, $q){
		var api_url = "http://localhost:3041"

		// this.getUsers = function(){
		// 	return $resource(api_url+'users', {}, {
		// 		get: {method:'GET', params:{}, isArray:true}
		// 	})
		// }
			// users: $resource(api_url+'users', {}, {
			// 	get: {method:'GET', params:{}, isArray:true}
			// }),
			// user: $resource(api_url+'user/:username', {username:'@username'}, {
			// 	'get': {method:'GET'},
			// 	'create': {method:'POST'},
			// 	'update': {method:'PUT'}
			// })
			// login: $resource(api_url+'login', {}, {
			// 	'get': {method:'POST'}
			// })
		this.login = function(user){
			if(!user)user = {}
			return $http.post(api_url+"/login",user)
		}
	})
})()