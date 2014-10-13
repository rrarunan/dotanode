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
			var heroPromise, itemPromise;
			
			heroPromise = $.getJSON("../../data/heroes.json", function (data) {
				var filteredData = _.pick(data, function (value, key, object) {
						return (key.indexOf('npc_dota_hero') !== -1);
					});
				//Pick just the heroes and add to heroRaw in DataMap
				DataMap.heroRaw = filteredData;
			});
			
			itemPromise = $.getJSON("../../data/items.json", function (data) {
				var filteredData = _.pick(data, function (value, key, object) {
						return (key.indexOf('item_') !== -1);
					});
				//Pick just the heroes and add to heroRaw in DataMap
				DataMap.itemRaw = filteredData;
			});
			
			// $.when() creates a new promise which will be:
			// resolved if both promises inside are resolved
			// rejected if one of the promises fails
			$.when(
				heroPromise,
				itemPromise
			)
			.done(function () {
				console.log('Heroes and Items data loaded.');
				DataMap.createLUTs();
			})
			.fail(function () {
				console.log('One of our loads failed');
			});

		},

		render: function () {
			$(".nav li").removeClass("active");//this will remove the active class from  
                                           //previously active menu item 
			this.$el.html(template());
			return this;
		}

	});

});
