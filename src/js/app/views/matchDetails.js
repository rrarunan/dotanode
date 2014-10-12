define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/MatchDetails.html'),

	template = _.template(tpl);

	return Backbone.View.extend({

		render : function (matchDetails) {
			this.$el.html(template(matchDetails));
			return this;
		}

	});

});
