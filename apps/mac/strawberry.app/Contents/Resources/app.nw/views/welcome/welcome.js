'use strict';

angular.module('Strawberry.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
	templateUrl: 'views/welcome/welcome.html',
	controller: 'WelcomeCtrl'
  });
}])

.controller('WelcomeCtrl', ['$scope', '$routeParams', '$rootScope', function($scope,$routeParams,$rootScope) {
}]);
