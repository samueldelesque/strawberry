'use strict';

angular.module('Strawberry.results', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results/:keyword', {
	templateUrl: 'results/results.html',
	controller: 'ResultsCtrl'
  });
}])
.controller('ResultsCtrl', ['$scope', '$routeParams', '$rootScope', function($scope,$routeParams,$rootScope) {
	var lookingFor = $routeParams.keyword
	alert("Results")
}]);

