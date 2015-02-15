'use strict';

angular.module('Strawberry.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
	templateUrl: 'search/search.html',
	controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', '$routeParams', '$rootScope', function($scope,$routeParams,$rootScope) {
	$scope.keyword
	$scope.searchFocus = function(){
		$scope.body.addClass("search-focus")
	}
	$scope.searchBlur = function(){
		$scope.body.removeClass("search-focus")
	}
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
			console.log("Run typewriter",elm,attrs)
			setTimeout(function(){elm.typer()},500)
		},
		template: 'Anything'
	}
});
