'use strict';

angular.module('Strawberry.users', ['ngResource'])

.factory('Users', ['$resource', function($resource){
	return $resource('http://api.strawberry.pixyt.com/users', {}, {query: {method:'GET', params:{}, isArray:true}})
}]);