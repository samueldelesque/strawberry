'use strict';

// Declare app level module which depends on views, and components
angular.module('Strawberry', [
	'ngRoute',
	'Strawberry.results',
	'Strawberry.search',
	'Strawberry.signup',
	'Strawberry.welcome',
	'Strawberry.api',
	'ui.bootstrap',
]).
config(['$routeProvider', function($routeProvider) {
	// $routeProvider.otherwise({redirectTo: '/search'});
}])
.controller('MainCtrl', ['$scope', '$location', 'Api', function($scope,$location,Api) {
	$scope.body = angular.element("body")

	$scope.username = (localStorage.getItem("username"))? localStorage.getItem("username") : ""

	$scope.user = ($scope.username)? Api.user.get({username:$scope.username}) : {}

	$scope.allResults = Api.users.get()

	// $scope.isDesktop = true

	// if($scope.isDesktop){
	// 	$scope.gui = require('nw.gui')
	// 	$scope.fs = require('fs')

	// 	$scope.gui.App.on('open', function(cmdline) {
	// 		console.log('command line: ' + cmdline);
	// 	})

	// 	$scope.fs.writeFile('/Users/sdelesque/Pixyt/test.txt','test',function(err,data){
	// 		if(err){$("body").html("An error occured");return;}
	// 		console.log(data);
	// 	})

	// }

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
		localStorage.setItem("username",$scope.user.username)
		Api.user.create({username:$scope.user.username},$scope.user)
		// localStorage.setItem("user",angular.toJson($scope.user))
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
		ga('send', 'pageview');
		if (data.$$route && data.$$route.controller){
			$rootScope.controller = data.$$route.controller;
			$rootScope.animatingClass = "intro"
			setTimeout(function(){$rootScope.animatingClass = ""},500);
		}
   })
});