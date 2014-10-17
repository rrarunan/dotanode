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
			//set heroes to be active nav item
			$(".nav li").removeClass("active");//this will remove the active class from  
                                           //previously active menu item 
			$('a[href="#items"]').parent().addClass('active');
			//clear any home view items
			$('#homeview').empty();
			
			this.$el.html(template());
			return this;
		}
	});

});