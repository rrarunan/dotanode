define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore/underscore'),
        Backbone            = require('backbone/backbone'),
        tpl                 = require('text/text!tpl/Heroes.html'),
		models				= require('app/models/hero'),
        template            = _.template(tpl);

    return Backbone.View.extend({

	//TODO: make this work with dynamic data
		initialize: function () {
			var me = this;
		    $.getJSON( "../../data/heroes.json", function( data ) {
				var filteredData = _.pick(data, function(value, key, object) {
					return (key.indexOf('npc_dota_hero') !== -1);
				});
				me.setCollection(_.values(filteredData));
			});
        },
		
		setCollection: function(data) {
			console.log(data);
            this.heroesCollection = new models.HeroCollection(data);
			this.render();
		},

        render: function () {
            this.$el.html(template());
			//TODO: backbonify this .. jquerying it for now
			if(this.heroesCollection != null) {
				this.heroesCollection.each(function(hero) { // iterate through the collection
					var heroesListView = $('.heroesList');
					if(hero.has('url')) {
						var repl = /_/gi;
						heroesListView.append("<tr><td>" + hero.get('url').replace(repl, ' ') + "</td>" +
						"<td>" + hero.get('Role') + "</td>" +
						"<td>" + hero.get('Team') + "</td></tr>");
					}
					//var contactView = new ContactView({model: contact}); 
					//self.$el.append(contactView.el);
				});
			}
            return this;
        }

    });

});