(function(){
	'use strict';

	angular.module('Strawberry.login', [
		'ngRoute',
		'Strawberry.api',
		'Strawberry.session'
	])

	.config(function($routeProvider) {
	  $routeProvider.when('/login', {
		templateUrl: 'views/login/login.html',
		controller: 'loginCtrl'
	  });
	})

	.controller('loginCtrl', function($scope,$routeParams,$location, Api, Session) {
		$scope.signIn = function(){
			Api.login($scope.user).success(function(response){
				Session.set("user",response.user)
				Session.set("sessionid",response.sessionid)
				$location.path('/search')
			}).error(function(err,data){
				alert("An error occured, please try again later")
			})
		}
	})
})()