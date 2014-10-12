define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Backbone = require('backbone/backbone'),
	HomeView = require('app/views/home'),
	MatchesView = require('app/views/matches'),
	MatchDetails = require('app/models/matchDetails');

	var $body = $('body'),
		homeView = new HomeView({
			el : $body
		});

	return Backbone.Router.extend({
		routes : {
			"" : "home",
			"heroes" : "heroes",
			"items": "items",
			"matches": "matchHistory",
			"matches/:id": "matchDetails"
		},

		home : function () {
			console.log("Congratulations! You've made it home.");
			homeView.delegateEvents(); // delegate events when the view is recycled
			homeView.render();
		},

		heroes : function () {
			if($('#content') == null || $('#content').length === 0) {
				homeView.render();
			}
			require(["app/views/heroes"], function (HeroesView) {
				var $container = $('#content');	
				var view = new HeroesView({
						el : $container
					});
				view.render();
			});
		},
		
		items: function() {
			console.log("Show items.");
		},
		
		matchHistory: function() {
			console.log("Show match history for current user");
			if($('#leftNav') == null || $('#leftNav').length === 0) {
				homeView.render();
			}
			var view = new MatchesView({
				el : $('#leftNav')
			});
			view.render();
		},
		
		matchDetails: function(id) {
			console.log("Show match details for selected match");
			if($('#matchDetailsContainer') == null || $('#matchDetailsContainer').length === 0) {
				homeView.render();
			}
			//First load match details
			var currMatch = new MatchDetails({match_id: id});
			currMatch.fetch(
				{
					success: function() {
						require(["app/views/matchDetails"], function (MatchDetailsView) {
						var view = new MatchDetailsView({
							el: $('#matchDetailsContainer')
						});
						view.render(currMatch.attributes);
					});
				}
			});
		}
		
	});

});
