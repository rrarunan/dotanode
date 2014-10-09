define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/HeroListItem.html'),
	models = require('app/models/hero'),
	template = _.template(tpl);

	return Backbone.View.extend({
		tagName: "li",

		className: "hero-list-item",

		events: {
		},

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},

		//render a rectangular tile with hero image and also an popover with vital stats
		render: function() {
			
		}
	});

});