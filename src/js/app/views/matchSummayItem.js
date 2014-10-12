define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/MatchSummaryItem.html'),
	model = require('app/models/matchsummary'),
	template = _.template(tpl);

	return Backbone.View.extend({

		events: {
		},

		initialize: function() {
		},

		//render a rectangular tile with hero image and also an popover with vital stats
		render: function() {
			this.$el.html(template(this.model.attributes));
            return this;
		}
	});

});