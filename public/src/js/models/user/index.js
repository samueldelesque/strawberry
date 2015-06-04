var validator = require("validator");

angular.module("Strawberry.user",[])

.service("User", function(){
	this.validate = function(name, value){
		if(!value){return false}
		switch(name){
			case "fullname":
				if(!validator.isLength(value,3,100)) return false
			break
			case "gender":
				if(!validator.isIn(value,["male","female","couple","other"])) return false
			break
			case "email":
				if(!validator.isEmail(value)) return false
			break
			case "password":
				if(value.length <= 5) return false
			break
			case "birthdate":
				var date = new Date(value)
				if(this.getAge(date) < 18) return false
			break
			case "phone":
				if(value.match(/^[2-9]\d{2}[\- ]?\d{3}[\- ]?\d{4}$/i) == null) return false
				// if(!validator.isMobilePhone(value,"en-US")) return false
			break
			default:
				console.log(name,"Not a valid User field!");
				return false;
			break;
		}
		return true
	}
	this.validateData = function(data){
		var errors = []
		if(!this.validate("fullname",data.fullname))errors.push("fullname")
		if(!this.validate("gender",data.gender))errors.push("gender")
		if(!this.validate("email",data.email))errors.push("email")
		if(!this.validate("birthdate",data.birthdate))errors.push("birthdate")
		if(!this.validate("phone",data.phone))errors.push("phone")
		return errors
	}
	this.set = function(name,value){
		if(this.validate(name,value)){
			this[name] = value
			return true
		}
		return false
	}
	this.get = function(){
		return {
			fullname: this.fullname,
			gender: this.gender,
			email: this.email,
			password: this.password,
			birthdate: this.birthdate.getUTCFullYear()+"-"+this.birthdate.getUTCMonth()+"-"+this.birthdate.getUTCDate(),
			phone: this.phone
		}
	}
	this.getAge = function(birthDate){
		if(!birthDate)birthDate = this.birthdate
		var today = new Date(),
			age = today.getFullYear() - birthDate.getFullYear(),
			m = today.getMonth() - birthDate.getMonth()

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
		return age
	}
})

module.exports = "Strawberry.user"