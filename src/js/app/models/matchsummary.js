
define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Backbone = require('backbone/backbone');

	return Backbone.Model.extend({
		idAttribute: 'match_id'
	});

});