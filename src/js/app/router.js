define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Backbone = require('backbone/backbone'),
	HomeView = require('app/views/home');

	var $body = $('body'),
		homeView = new HomeView({
			el : $body
		});

	return Backbone.Router.extend({
		routes : {
			"" : "home",
			"heroes" : "heroes",
			"items": "items",
			"matches": "matchHistory"
		},

		home : function () {
			console.log("Congratulations! You've made it home.");
			homeView.delegateEvents(); // delegate events when the view is recycled
			homeView.render();
		}, //,

		heroes : function () {
			homeView.render();
			require(["app/views/heroes"], function (HeroesView) {
				console.log("I'm supposed to show heroes");
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
			homeView.render();	//TODO: is this needed every time??
			require(["app/views/matches"], function (MatchesView) {
				console.log("I'm supposed to show match history here");
				var $container = $('#content');	
				var view = new MatchesView({
						el : $container
					});
				view.render();
			});
		}		
		
	});

});
