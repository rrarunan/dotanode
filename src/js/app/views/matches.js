define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/Matches.html'),
	models = require('app/models/matchsummary'),
	MatchCollection = require('app/collections/matchsummarycollection'),
	template = _.template(tpl);

	return Backbone.View.extend({

		//TODO: make this work with dynamic data
		initialize : function () {
			var me = this;
			me.matchCollection = new MatchCollection();
			me.matchCollection.fetch({data: {'account_id': '76561197988729271'}});
		},

		render : function () {
			this.$el.html(template());
			return this;
		}

	});

});
