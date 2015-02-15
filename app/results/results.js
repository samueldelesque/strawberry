'use strict';

angular.module('Strawberry.results', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results/:lookingfor', {
	templateUrl: 'results/results.html',
	controller: 'ResultsCtrl'
  });
}])
.controller('ResultsCtrl', ['$scope', '$routeParams', '$filter', function($scope,$routeParams,$filter) {
	$scope.user.lookingFor = decodeURI($routeParams.lookingfor)
	$scope.saveUser()

	$scope.results = results_fixtures.filter(function(e,i){
		return (e.lookingFor == $scope.user.lookingFor)
	});

	var interests = []
	angular.forEach(results_fixtures,function(e,i){
		if(interests.indexOf(e.lookingFor) == -1) interests.push(e.lookingFor)
	})
	$scope.interests = interests
	console.log($scope.interests)
}]);


var results_fixtures = [
	{
		name: "Henri",
		gender: "a guy",
		age: 60,
		lookingFor: "lick pussy",
		lookingForGender: "a girl"
	},
	{
		name: "Margaret",
		gender: "a girl",
		age: 31,
		lookingFor: "lick pussy",
		lookingForGender: "a girl"
	},
	{
		name: "Sam & Carlotta",
		gender: "a couple",
		age: 24,
		lookingFor: "lick a dick",
		lookingForGender: "a guy"
	},
	{
		name: "Stephanie",
		gender: "a girl",
		age: 34,
		lookingFor: "lick a dick",
		lookingForGender: "a guy"
	},
	{
		name: "Chey",
		gender: "a girl",
		age: 23,
		lookingFor: "eat cheese",
		lookingForGender: "a group of friends"
	},
	{
		name: "Sam",
		gender: "a guy",
		age: 23,
		lookingFor: "drink a beer",
		lookingForGender: "a guy"
	},
	{
		name: "Matthieu",
		gender: "a guy",
		age: 23,
		lookingFor: "a couch",
		lookingForGender: "any"
	},
	{
		name: "Carlotta",
		gender: "a girl",
		age: 23,
		lookingFor: "lick pussy",
		lookingForGender: "any"
	},
	{
		name: "Jeremy",
		gender: "a guy",
		age: 24,
		lookingFor: "a visa",
		lookingForGender: "a girl"
	},
	{
		name: "Robert",
		gender: "a guy",
		age: 24,
		lookingFor: "eat cheese",
		lookingForGender: "any"
	},
	{
		name: "Kelsey",
		gender: "a girl",
		age: 26,
		lookingFor: "eat cheese",
		lookingForGender: "any"
	},
	{
		name: "Gittie",
		gender: "a girl",
		age: 53,
		lookingFor: "rent an appartment",
		lookingForGender: "any"
	},
	{
		name: "Josh",
		gender: "a guy",
		age: 23,
		lookingFor: "eat tacos",
		lookingForGender: "any"
	},
	{
		name: "Gabriel",
		gender: "a guy",
		age: 30,
		lookingFor: "drink a beer",
		lookingForGender: "any"
	},
	{
		name: "Brenna",
		gender: "a girl",
		age: 22,
		lookingFor: "get whipped",
		lookingForGender: "any"
	},
	{
		name: "Angel",
		gender: "a guy",
		age: 90,
		lookingFor: "get whipped",
		lookingForGender: "a guy"
	}
]