'use strict';

// Declare app level module which depends on views, and components
angular.module('Strawberry', [
  'ngRoute',
  'Strawberry.results',
  'Strawberry.search',
  'ui.bootstrap',
]).
config(['$routeProvider', function($routeProvider) {
  // $routeProvider.otherwise({redirectTo: '/search'});
}])
.controller('MainCtrl', function($scope) {
  $scope.body = angular.element("body");
	$scope.log = function(m){console.log(m)}

	$scope.log("Strawberry starting...")
  $scope.toggleMenu = function(){
    $scope.body.toggleClass("show-nav")
  }
})
.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
	return $filter('number')(input * 100, decimals) + '%';
  };
}]);