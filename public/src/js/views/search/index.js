(function(){
	'use strict';

	angular.module('Strawberry.search', [
		'ngRoute',
		'Strawberry.api',
		'Strawberry.session'
	])

	.config(function($routeProvider) {
	  $routeProvider.when('/search', {
		templateUrl: 'views/search/search.html',
		controller: 'searchCtrl'
	  });
	})

	.controller('searchCtrl', function($scope, $location, Session, Api) {
		if(!Session.get("user")){
			console.error("Please sign in first")
			$location.path("/login")
		}
		else{
			console.log(Session.get("user"))
			$scope.user = Session.get("user")
		}
	})
})()