const validator = require('validator'),
	Model = require('./model.js'),
	Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
	fullname: { type: String, required: true },
	gender: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	phone: { type: String, unique: true, required: true },
	password: { type: String, required: false },
	birthdate: { type: Date, required: false },
	created: { type: Date, default: Date.now },
	lastLogin: { type: Date }
});

UserSchema.methods.fields = function(cb){
	return ["fullname","gender","email","phone","password","birthdate","created"]
}

module.exports = Mongoose.model('User', UserSchema, 'users');

/*

Older version


var User = Model.extend({
	allowedFields: function(){
		return ["fullname","gender","email","password","birthdate","phone"]
	},
	getName: function(){
		return "My name is "+this.get("fullname")
	},
	validate: function(name, value){
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
				if(this.getAge(value) < 18) return false
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
	},
	getAge: function(date){
		var today = new Date(),
			birthDate = new Date(date),
			age = today.getFullYear() - birthDate.getFullYear(),
			m = today.getMonth() - birthDate.getMonth()

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
		return age
	}
})

module.exports = User

*/