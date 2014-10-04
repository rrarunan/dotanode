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
			var heroesJson = $.getJSON( "../../data/heroes.json", function( data ) {
			var filteredData = _.pick(data, function(value, key, object) {
				return (key.indexOf('npc_dota_hero') !== -1);
			  });
			var heroesList = [_.values(filteredData)];
			  console.log(heroesList);
			});
            this.heroesList = new models.HeroCollection();
			this.heroesList.fetch();
        },
		
        render: function () {
            this.$el.html(template());
            return this;
        }

    });

});