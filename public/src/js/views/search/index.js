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

.controller("searchCtrl", function($scope, Api, Session) {
	if(Session.user() == null){
		$location.path("/")
	}
	window.Session = Session
	$scope.user = Session.user()
	$scope.search = function(){
		alert("Sorry not available yet!")
	}
})

module.exports = "Strawberry.search"