'use strict';

angular.module('Strawberry.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
	templateUrl: 'views/search/search.html',
	controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', '$location', function($scope,$location) {
	if(!$scope.user.name){$location.path("/signup")}
}]);
