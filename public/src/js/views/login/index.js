(function(){
	angular.module('Strawberry.login', [
		'ui.router',
		'ngCookies',
		'Strawberry.api',
		'Strawberry.session'
	])

	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('login', {
			url: "/login",
			template: '<h1>Login!</h1>',
			// templateUrl: 'login/index.html',
			controller: 'loginCtrl'
		});
	})

	.controller('loginCtrl', function($scope,$routeParams,$location, $cookies, Api, Session) {
		alert("Yo")
		$scope.signIn = function(){
			Api.login($scope.user).success(function(response){
				Session.set("user",response.user)
				Session.set("sessionid",response.sessionid)
				$location.path('/search')
			}).error(function(err,data){
				alert("An error occured, please try again later")
			})
		}
	})
})()