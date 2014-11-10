define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	Masonry = require('masonry/masonry'),
	tpl = require('text/text!tpl/Items.html'),
	models = require('app/models/item'),
	ImagesLoaded = require('imagesloaded/imagesloaded'),
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
			this.itemsCollection = new models.ItemCollection(data);
			this.render();
		},

		render : function () {
			
			//set heroes to be active nav item
			$(".nav li").removeClass("active");//this will remove the active class from  
                                           //previously active menu item 
			$('a[href="#items"]').parent().addClass('active');
			//clear any home view items
			$('#homeview').empty();

			this.$el.html(template(this.itemsCollection));
			
			var $container = $('#itemsContainer');
			$container.imagesLoaded( function() {
				$container.masonry({
				  // options
				  columnWidth: 10,
				  itemSelector: '.item'
				});
			});

			$container.on( 'mouseover', '.item', function() {
    			// change size of item by toggling gigante class
    			//$( this ).toggleClass('gigante');
    			//$container.isotope('layout');
  			});

			return this;
		}

	});

});
