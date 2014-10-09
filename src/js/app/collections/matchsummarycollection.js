
define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Backbone = require('backbone/backbone'),
	MatchSummary = require('app/models/matchsummary');

	return Backbone.Collection.extend({
		url: 'http://localhost:9002/matches',
		model: MatchSummary,
		parse: function(response) {
			var status = response.result.status;	//If status === 15 -> player data is not available
			var num_results = response.result.num_results;
			var total_results = response.result.total_results;
			var remaining_results = response.result.remaining_results;
			return response.result.matches;
		}
	});

});