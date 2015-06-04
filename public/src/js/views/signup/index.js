angular.module("Strawberry.signup", [
	"ui.router",
	"Strawberry.api",
	"Strawberry.session",
	"Strawberry.user"
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("signup", {
		url: "/signup",
		templateUrl: "signup/index.html",
		controller: "signupCtrl"
	});
})

.controller("signupCtrl", function($scope, $location, Api, Session, User) {
	if(Session.user()){
		$location.path('/search')
	}
	$scope.user = User;

	var now = new Date(),
		y = now.getFullYear(),
		m = now.getMonth(),
		d = now.getDate()

	$scope.user.gender = "female"
	$scope.user.birthdate = new Date()

	$scope.birthdate = {day:d,month:m,year:y}
	$scope.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
	$scope.years = []
	for(year=y;year>y-100;year--)$scope.years.push(year)
	$scope.months = [
		{name:"jan",value:1},
		{name:"feb",value:2},
		{name:"mar",value:3},
		{name:"apr",value:4},
		{name:"may",value:5},
		{name:"jun",value:6},
		{name:"jul",value:7},
		{name:"aug",value:8},
		{name:"sep",value:9},
		{name:"oct",value:10},
		{name:"nov",value:11},
		{name:"dec",value:12},
	]

	$scope.setBirthday = function(){
		$scope.user.birthdate = new Date($scope.birthdate.year,$scope.birthdate.month,$scope.birthdate.day)
	}

	$scope.signUp = function(){
		if($scope.user.getAge() < 18){
			$scope.agegate = true
			return
		}
		var data = $scope.user.get(),
			errors = $scope.user.validateData(data)

		if(errors.length > 0){
			angular.forEach(errors,function(e){
				var el = angular.element(document.getElementById("user-"+e))
				el.addClass("error")
				el.bind("focus",function(){
					el.removeClass("error")
				})
			})
		}
		else{
			Api.signup(data).success(function(response){
				Session.user(response.user)
				Session.sessionid(response.sessionid)
				$location.path("/search")
			}).error(function(err,data){
				alert("An error occured, please try again later")
			})
		}
	}
})

module.exports = "Strawberry.signup"