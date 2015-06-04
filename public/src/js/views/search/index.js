angular.module("Strawberry.search", [
	"ui.router",
	"Strawberry.api",
	"Strawberry.session"
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("search", {
		url: "/search",
		templateUrl: "search/index.html",
		controller: "searchCtrl"
	});
})

.controller("searchCtrl", function($scope, $location, Api, Session) {
	if(!Session.user()){
		$location.path("/")
	}
	$scope.user = Session.user()
	$scope.search = function(){
		alert("Sorry not available yet!")
	}
})

module.exports = "Strawberry.search"