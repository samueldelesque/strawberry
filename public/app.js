'use strict';

// Declare app level module which depends on views, and components
angular.module('Strawberry', [
	'ngRoute',
	'Strawberry.results',
	'Strawberry.search',
	'Strawberry.signup',
	'Strawberry.welcome',
	'ui.bootstrap',
]).
config(['$routeProvider', function($routeProvider) {
	// $routeProvider.otherwise({redirectTo: '/search'});
}])
.controller('MainCtrl', ['$scope', '$location', function($scope,$location) {
	$scope.body = angular.element("body")

	$scope.user = (localStorage.getItem("user"))? angular.fromJson(localStorage.getItem("user")) : {
		name: "",
		gender: "",
		age: 20,
		lookingFor: "",
		lookingForGender: ""
	}

	$scope.allResults = results_fixtures

	var interests = []
	angular.forEach($scope.allResults,function(e,i){
		if(interests.indexOf(e.lookingFor) == -1) interests.push(e.lookingFor)
	})
	$scope.interests = interests

	$scope.log = console.log
	$scope.toggleMenu = function(){
		$scope.body.toggleClass("show-nav")
	}
	$scope.saveUser = function(){
		localStorage.setItem("user",angular.toJson($scope.user))
	}
	$scope.search = function(){
		if($scope.user.lookingFor){
			$location.path("/results/"+$scope.user.lookingFor)
		}
		else{
			angular.element("#searchField").focus()
		}
	}
}])
.filter('percentage', ['$filter', function ($filter) {
	return function (input, decimals) {
	return $filter('number')(input * 100, decimals) + '%';
	};
}])
.directive('typewriter', function() {
	$.typer.options = {
		highlightSpeed    : 20,
		typeSpeed         : 200,
		clearDelay        : 1000,
		typeDelay         : 200,
		clearOnHighlight  : true,
		typerDataAttr     : 'data-typer-targets',
		typerInterval     : 2000
	}
	return {
		link: function(scope, elm, attrs) {
			setTimeout(function(){elm.typer()},500)
		},
		template: 'Anything'
	}
})
.directive('inputfocus', function() {
	return {
		link: function($scope, $elm, $attrs) {
			$elm.focus(function(){
				$scope.body.addClass("input-focus")
			})
			$elm.blur(function(){
				($elm.val() && $elm.parent().addClass("has-value"))
				$scope.body.removeClass("input-focus")
			})
		},
	}
})
.run(function($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(ev,data) {   
		if (data.$$route && data.$$route.controller){
			$rootScope.controller = data.$$route.controller;
			$rootScope.animatingClass = "intro"
			setTimeout(function(){$rootScope.animatingClass = ""},500);
		}
   })
});;


var results_fixtures = [
	{
		name: "Henri",
		gender: "m",
		age: 60,
		lookingFor: "lick pussy",
		lookingForGender: "f"
	},
	{
		name: "Margaret",
		gender: "f",
		age: 31,
		lookingFor: "lick pussy",
		lookingForGender: "f"
	},
	{
		name: "Sam & Carlotta",
		gender: "couple",
		age: 24,
		lookingFor: "lick a dick",
		lookingForGender: "m"
	},
	{
		name: "8th st wankers",
		gender: "group",
		age: 44,
		lookingFor: "gang bang",
		lookingForGender: "f"
	},
	{
		name: "SexySushi",
		gender: "group",
		age: 24,
		lookingFor: "gang bang",
		lookingForGender: "any"
	},
	{
		name: "Stephanie",
		gender: "f",
		age: 34,
		lookingFor: "lick a dick",
		lookingForGender: "m"
	},
	{
		name: "Chey",
		gender: "f",
		age: 23,
		lookingFor: "eat cheese",
		lookingForGender: "friends"
	},
	{
		name: "Sam",
		gender: "m",
		age: 23,
		lookingFor: "drink a beer",
		lookingForGender: "m"
	},
	{
		name: "Matthieu",
		gender: "m",
		age: 23,
		lookingFor: "drink a beer",
		lookingForGender: "any"
	},
	{
		name: "Carlotta",
		gender: "f",
		age: 23,
		lookingFor: "lick pussy",
		lookingForGender: "any"
	},
	{
		name: "Jeremy",
		gender: "m",
		age: 24,
		lookingFor: "get married",
		lookingForGender: "f"
	},
	{
		name: "Robert",
		gender: "m",
		age: 24,
		lookingFor: "eat cheese",
		lookingForGender: "any"
	},
	{
		name: "Kelsey",
		gender: "f",
		age: 26,
		lookingFor: "eat cheese",
		lookingForGender: "any"
	},
	{
		name: "Josh",
		gender: "m",
		age: 23,
		lookingFor: "eat tacos",
		lookingForGender: "any"
	},
	{
		name: "Gabriel",
		gender: "m",
		age: 30,
		lookingFor: "drink a beer",
		lookingForGender: "any"
	},
	{
		name: "Brenna",
		gender: "f",
		age: 22,
		lookingFor: "get whipped",
		lookingForGender: "any"
	},
	{
		name: "Angel",
		gender: "m",
		age: 90,
		lookingFor: "get whipped",
		lookingForGender: "m"
	}
]