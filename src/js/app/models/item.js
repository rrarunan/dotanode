define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Backbone = require('backbone/backbone');

	var Item = Backbone.Model.extend({
			urlRoot : "http://localhost:9002/items"
		});

	var ItemCollection = Backbone.Collection.extend({
			model : Item,
			url : "http://localhost:9002/items"
		});

	return {
		Item : Item,
		ItemCollection : ItemCollection
	};

});
