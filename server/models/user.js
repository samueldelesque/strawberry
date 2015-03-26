var validator = require('validator')
var Model = require('./model.js')

var User = Model.extend({
	getName: function(){
		return "My name is "+this.get("fullname")
	},
	validate: function(name, value){
		switch(key){
			case "name":
				if(!validator.isLength(value,3,49))return false
			break
			case "gender":
				if(!validator.isIn(value,["m","f","t"]))return false
			break
			default:
				console.log(name,"Not a valid User field!");
				return false;
			break;
		}
		return true
	}
})

module.exports = User