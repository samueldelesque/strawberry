'use strict';

// Declare app level module which depends on views, and components
angular.module('Strawberry', [
	'ngRoute',
	'Strawberry.results',
	'Strawberry.search',
	'Strawberry.signup',
	'Strawberry.welcome',
	'Strawberry.users',
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

	$scope.allResults = []

	

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
});