'use strict';

angular.module('Strawberry.api', ['ngResource'])

.factory('Api', ['$resource', function($resource){
	var api_url = "http://localhost:3041/"
	return {
		users: $resource(api_url+'users', {}, {
			get: {mexthod:'GET', params:{}, isArray:true}
		}),
		user: $resource(api_url+'user/:username', {username:'@username'}, {
			'get': {method:'GET'},
			'create': {method:'POST'},
			'update': {method:'PUT'}
		})
	}
}]);