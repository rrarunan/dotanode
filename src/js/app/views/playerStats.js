define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/PlayerStats.html'),
	template = _.template(tpl);

	return Backbone.View.extend({
		
		//Pass an object containing Player info and Match history (with  details)
		render : function (playerAndMatches) {
			
		};
	});

});