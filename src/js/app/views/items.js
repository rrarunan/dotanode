define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	Masonry = require('masonry/masonry'),
	tpl = require('text/text!tpl/Items.html'),
	models = require('app/models/item'),
	dataMap = require('app/map'),
	template = _.template(tpl);

	return Backbone.View.extend({

		//TODO: make this work with dynamic data
		initialize : function () {
			var me = this;
			me.setCollection(_.values(dataMap.itemRaw));
		},

		setCollection : function (data) {
			console.log(data);
			this.temsCollection = new models.ItemCollection(data);
			this.render();
		},

		render : function () {
			
			//set heroes to be active nav item
			$(".nav li").removeClass("active");//this will remove the active class from  
                                           //previously active menu item 
			$('a[href="#items"]').parent().addClass('active');
			//clear any home view items
			$('#homeview').empty();
			this.$el.html(template());
			//TODO: backbonify this .. jquerying it for now
			if (this.itemsCollection != null) {
			}
			return this;
		}

	});

});
