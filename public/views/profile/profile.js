'use strict';

angular.module('Strawberry.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
	templateUrl: 'views/profile/profile.html',
	controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['$scope', '$routeParams', '$rootScope', function($scope,$routeParams,$rootScope) {
	$scope.validateUser = function(){
		$scope.saveUser()
		$location.path('/search')
	}
}]);
