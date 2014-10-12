define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/Home.html'),
	DataMap = require('app/map'),

	template = _.template(tpl);

	return Backbone.View.extend({
	
		initialize: function() {
			$.getJSON("../../data/heroes.json", function (data) {
				var filteredData = _.pick(data, function (value, key, object) {
						return (key.indexOf('npc_dota_hero') !== -1);
					});
				//Pick just the heroes and add to heroRaw in DataMap
				DataMap.heroRaw = filteredData;
				//TODO: Also load items before creating Look up Tables
				DataMap.createLUTs();
			});
		},

		render: function () {
			this.$el.html(template());
			return this;
		}

	});

});
