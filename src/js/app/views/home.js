define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/Home.html'),

	template = _.template(tpl);

	return Backbone.View.extend({

		render : function () {
			var $container = $('#content');
			$container.empty();
			this.$el.html(template());
			return this;
		}

	});

});
