'use strict';

angular.module('Strawberry.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
	templateUrl: 'views/signup/signup.html',
	controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope', '$routeParams', '$location', function($scope,$routeParams,$location) {
	$scope.validateUser = function(){
		Api.user.create($scope.user)
		// $location.path('/search')
	}
}]);
