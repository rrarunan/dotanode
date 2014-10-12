define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/MatchSummaryItem.html'),
	template = _.template(tpl);

	return Backbone.View.extend({

		initialize: function() {
			this.model.on("change", this.render, this);
		},

		//render a rectangular tile with hero image and also an popover with vital stats
		render: function() {
			this.$el.html(template(this.model.attributes));
            return this;
		}
	});

});