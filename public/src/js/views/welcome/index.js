angular.module('Strawberry.welcome', [
	'ui.router',
	'ngCookies',
	'Strawberry.api',
	'Strawberry.session'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('welcome', {
		url: "/",
		templateUrl: 'welcome/index.html',
		controller: 'welcomeCtrl'
	});
})

.controller('welcomeCtrl', function($scope,$location, $cookies, Api, Session) {

})

module.exports = "Strawberry.welcome"