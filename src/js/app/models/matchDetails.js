define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Backbone = require('backbone/backbone');

	return Backbone.Model.extend({
		urlRoot: 'http://localhost:9002/matchdetails',
		idAttribute: 'match_id',
		parse: function(response) {
			return response.result;
		}
	});

});