var validator = require('validator')

module.exports = function(){
	var user = function(data){
		console.log("test oauehgouasehgiusaehguish",data.fullname)
		this.username = data.username || ""
		this.fullname = data.fullname || ""
		this.gender = data.gender || ""
		this.age = data.age || 0
	}
	user.prototype.set = function(key,value){
		switch(key){
			case "name":
				if(!validator.isLength(value,3,49))return false
			break
			case "gender":
				if(!validator.isIn(value,["m","f","t"]))return false
			break
			// case "age":
			// 	if(!validator.isIn(value,["m","f","t"]))return false
			// break
		}
		this[key] = value
		return true
	}
	user.prototype.get = function(key){
		var exports = {
			username: this.username,
			fullname: this.fullname,
			gender: this.gender,
			age: this.age
		}
		if(key && exports.hasOwnProperty(key))return exports[key]
		return exports
	}
	return user
}