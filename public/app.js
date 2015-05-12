(function(){
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('Strawberry', [
		'ngRoute',
		'Strawberry.api',
		// 'Strawberry.results',
		// 'Strawberry.search',
		// 'Strawberry.signup',
		// 'Strawberry.welcome',
		'Strawberry.login',
		'ui.bootstrap',
	]).
	config(function($routeProvider) {
		// $routeProvider.otherwise({redirectTo: '/search'});
	})
	.controller('MainCtrl', function($scope,$location) {
		$scope.body = angular.element("body")

		// $scope.username = (localStorage.getItem("username"))? localStorage.getItem("username") : ""

		// $scope.user = Api.user.get({username:$scope.username}) : {}


		// $scope.allResults = Api.users.get()

		// var interests = []
		// angular.forEach($scope.allResults,function(e,i){
		// 	if(interests.indexOf(e.lookingFor) == -1) interests.push(e.lookingFor)
		// })
		// $scope.interests = interests

		// $scope.log = console.log
		$scope.toggleMenu = function(){
			$scope.body.toggleClass("show-nav")
		}
	})
	.filter('percentage', function ($filter) {
		return function (input, decimals) {
		return $filter('number')(input * 100, decimals) + '%';
		};
	})
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
			ga('send', 'pageview');
			if (data.$$route && data.$$route.controller){
				$rootScope.controller = data.$$route.controller;
				$rootScope.animatingClass = "intro"
				setTimeout(function(){$rootScope.animatingClass = ""},500);
			}
	   })
	});
})()