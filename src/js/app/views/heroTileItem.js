define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/HeroTileItem.html'),
	models = require('app/models/hero'),
	//temporary for testing
	MatchSummaryCollection = require('app/collections/matchsummarycollection'),
	template = _.template(tpl);

	return Backbone.View.extend({
		tagName: "li",

		className: "hero-tile-item",

		events: {
		},

		initialize: function() {
		},

		//render a rectangular tile with hero image and also an popover with vital stats
		render: function() {
			//console.log("rendering a hero tile");
		}
	});

});