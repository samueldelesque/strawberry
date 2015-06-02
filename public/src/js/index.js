"use strict";

require('angular');
require("angular-ui-router");
require("angular-cookies");

require("./services");
require("./views");

var app = angular.module("Strawberry", [
		"ui.router",
		// "ngCookies",
		"Strawberry.api",
		"Strawberry.session",
		// "Strawberry.results",
		// "Strawberry.search",
		// "Strawberry.signup",
		// "Strawberry.welcome",
		"Strawberry.login"
		// "ui.bootstrap",
	])

	.config(function($urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
	})

	.controller("MainCtrl", function($scope,$location) {
		$scope.body = angular.element(document.body)
		$scope.toggleMenu = function(){
			$scope.body.toggleClass("show-nav")
		}
	})
	.filter("percentage", function ($filter) {
		return function (input, decimals) {
		return $filter("number")(input * 100, decimals) + "%";
		};
	})
	.directive("typewriter", function() {
		$.typer.options = {
			highlightSpeed    : 20,
			typeSpeed         : 200,
			clearDelay        : 1000,
			typeDelay         : 200,
			clearOnHighlight  : true,
			typerDataAttr     : "data-typer-targets",
			typerInterval     : 2000
		}
		return {
			link: function(scope, elm, attrs) {
				setTimeout(function(){elm.typer()},500)
			},
			template: "Anything"
		}
	})
	.directive("inputfocus", function() {
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
		$rootScope.$on("$routeChangeSuccess", function(ev,data) {   
			ga("send", "pageview");
			if (data.$$route && data.$$route.controller){
				$rootScope.controller = data.$$route.controller;
				$rootScope.animatingClass = "intro"
				setTimeout(function(){$rootScope.animatingClass = ""},500);
			}
		})
	});