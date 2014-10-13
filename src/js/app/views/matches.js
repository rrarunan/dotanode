define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	Mustache = require('mustache/mustache'),
	tpl = require('text/text!tpl/Matches.html'),
	models = require('app/models/matchsummary'),
	MatchCollection = require('app/collections/matchsummarycollection'),
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

			////Backgrid test
			var columns = [{
					name : "match_id", // The key of the model attribute
					label : "ID", // The name to display in the header
					editable : false, // By default every cell in a column is editable, but *ID* shouldn't be
					// Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
					cell : Backgrid.IntegerCell.extend({
						orderSeparator : ''
					})
				}, {
					name : "start_time",
					label : "Time",
					// The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
					cell : 'string'
				}, {
					name : "lobby_type",
					label : "Lobby Type",
					cell : "integer" // An integer cell is a number cell that displays humanized integers
				}
			];

			// Initialize a new Grid instance
			me.grid = new Backgrid.Grid({
					columns : columns,
					collection : me.matchCollection
				});
			/////////Backgrid test end

			me.matchCollection.fetch({
				data : {
					'account_id' : '76561197988729271'
				},
				success :  function (collection, response, options) {
					me.loadedMatches = true;
					me.render();
				}});
			
			var view = {
			  title: "Joe",
			  calc: function () {
				return 2 + 4;
			  }
			};

			var output = Mustache.render("{{title}} spends {{calc}}", view);
			
			console.log("mustache test: " + output);
		},

		render : function () {
			$(".nav li").removeClass("active");//this will remove the active class from  
                                           //previously active menu item 
			$('a[href="#matches"]').parent().addClass('active');
			//clear any home view items
			$('#homeview').empty();
			if (this.loadedMatches) {
				_.each(this.matchCollection.models, function (match) {
					/*new MatchSummaryItemView({
							model : match
						}).render().el*/
					var matchSummaryLink = "<li><a href='/#matches/{{ match_id }}'> {{ match_id }} </a></li>";
					this.$el.append(Mustache.render(matchSummaryLink, match.attributes));
				}, this);
				return this;
			}
			//this.$el.html(this.grid.render().el);
			//return this;
		}

	});

});
