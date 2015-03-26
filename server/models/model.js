function Model(data) {
  this.data = data || {};
}
Model.prototype.set = function(name, value){
  this.data[name] = value
}
Model.prototype.get = function(name){
  return this.data[name]
}
Model.prototype.isset = function(name){
  return Object.prototype.hasOwnProperty.call(this.data, name) && Object.prototype.propertyIsEnumerable.call(this.data, name)
}
Model.prototype.each = function(action) {
	for (var property in this.data) {
		action(property, this.data[property])
	}
}
Model.prototype.extend = function(target) {
	for (var property in Model){
		if(Model.hasOwnProperty(property)) target[property] = Model[property]
	}
	return target
}

module.exports = Model