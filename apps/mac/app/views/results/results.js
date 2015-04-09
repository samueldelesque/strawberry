'use strict';

angular.module('Strawberry.results', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results/:lookingfor', {
	templateUrl: 'views/results/results.html',
	controller: 'ResultsCtrl'
  });
}])
.controller('ResultsCtrl', ['$scope', '$routeParams', '$filter', function($scope,$routeParams,$filter) {
	$scope.user.lookingFor = decodeURI($routeParams.lookingfor)
	$scope.saveUser()

	$scope.results = $scope.allResults.filter(function(e,i){
		return (e.lookingFor == $scope.user.lookingFor)
	});
	
}]);