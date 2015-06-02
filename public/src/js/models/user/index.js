var validator = require("validator");

angular.module("Strawberry.user",[])

.service("User", function(){
	this.validate = function(name, value){
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
				if(this.getAge(new Date(value)) < 18) return false
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
	this.set = function(name,value){
		if(this.validate(name,value)){
			this[name] = value
			return true
		}
		return false
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