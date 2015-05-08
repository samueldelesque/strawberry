(function(){
	'use strict';

	angular.module('Strawberry.login', [
		'ngRoute',
		'Strawberry.api'
	])

	.config(function($routeProvider) {
	  $routeProvider.when('/login', {
		templateUrl: 'views/login/login.html',
		controller: 'loginCtrl'
	  });
	})

	.controller('loginCtrl', function($scope,$routeParams,$location, Api) {
		$scope.signIn = function(){
			Api.login($scope.user).then(function(user){
				console.log(user)
			})
		}
	})
})()