'use strict';

angular.module('Strawberry.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
	templateUrl: 'signup/signup.html',
	controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope', '$routeParams', '$location', function($scope,$routeParams,$location) {
	$scope.validateUser = function(){
		$scope.saveUser()
		$location.path('/search')
	}
}]);
