define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	Mustache = require('mustache/mustache'),
	tpl = require('text/text!tpl/Matches.html'),
	models = require('app/models/matchsummary'),
	MatchCollection = require('app/collections/matchsummarycollection'),
	Dropdown = require('bootstrap/dropdown'),
	MatchSummary = require('app/models/matchsummary'),
	MatchSummaryItemView = require('app/views/matchSummaryItem'),
	Backgrid = require('backgrid/lib/backgrid'),
	template = _.template(tpl);

	return Backbone.View.extend({

		// Render the grid and attach the root to your HTML document
		//$("#example-1-result").append(grid.render().el);


		//TODO: make this work with dynamic data
		initialize : function () {
			var me = this;
			me.matchCollection = new MatchCollection();

			me.matchCollection.fetch({
				data : {
					//hardcoded to my account so far
					'account_id' : '76561197988729271'
				},
				success :  function (collection, response, options) {
					me.loadedMatches = true;
					me.render();
				}});
		},

		render : function () {
			$(".nav li").removeClass("active");//this will remove the active class from  
                                           //previously active menu item 
			$('a[href="#matches"]').parent().addClass('active');
			//clear any home view items
			$('#homeview').empty();

			if (this.loadedMatches) {
				this.$el.html(template());
				//Change this to a selector based on time(date)
				var $leftNav = $("#leftNav");
				if($leftNav) {
					_.each(this.matchCollection.models, function (match) {
						var matchSummaryLink = "<li  role='presentation'><a role='menuitem' tabindex='-1' href='/#matches/{{ match_id }}'> {{ match_id }} </a></li>";
						$leftNav.append(Mustache.render(matchSummaryLink, match.attributes));
					}, this);
				}
				return this;
			}
		}

	});

});
