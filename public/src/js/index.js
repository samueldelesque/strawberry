"use strict";

require("angular");
require("angular-ui-router");
require("angular-cookies");

require("./services");
require("./views");
require("./models");
require("./directives");

module.exports = angular.module("Strawberry", [
		"ui.router",
		"ngCookies",
		"Strawberry.api",
		"Strawberry.session",
		"Strawberry.user",
		// "Strawberry.results",
		"Strawberry.search",
		"Strawberry.signup",
		"Strawberry.welcome",
		"Strawberry.login"
		// "ui.bootstrap",
	])

	.config(function($urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
	})

	.controller("MainCtrl", function($scope,$location,Session) {
		if(Session.get("user")){
			$location.path('/search')
		}
		$scope.body = angular.element(document.body)
		$scope.env = window.Settings.env||"prod"
	})
	.filter("percentage", function ($filter) {
		return function (input, decimals) {
			return $filter("number")(input * 100, decimals) + "%";
		}
	})
	.directive("inputfocus", function() {
		return {
			link: function($scope, $elm, $attrs) {
				$elm.on("focus",function(){
					$scope.body.addClass("input-focus")
				})
				$elm.on("blur",function(){
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
	})
	.run(function($rootScope, $templateCache) {
		$rootScope.$on("$viewContentLoaded", function() {
			$templateCache.removeAll();
		});
	});