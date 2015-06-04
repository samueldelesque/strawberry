angular.module('Strawberry.login', [
	'ui.router',
	'ngCookies',
	'Strawberry.api',
	'Strawberry.session'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('login', {
		url: "/login",
		templateUrl: 'login/index.html',
		controller: 'loginCtrl'
	});
})

.controller('loginCtrl', function($scope,$location, $cookies, Api, Session) {
	if(Session.user()){
		$location.path('/search')
	}
	$scope.signIn = function(){
		Api.login($scope.user).success(function(response){
			Session.user(response.user)
			Session.sessionid(response.sessionid)
			$location.path('/search')
		}).error(function(err,data){
			alert("An error occured, please try again later")
		})
	}
})

module.exports = "Strawberry.login"