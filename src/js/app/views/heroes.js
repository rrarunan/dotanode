define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/Heroes.html'),
	models = require('app/models/hero'),
	HeroTileItem = require('app/views/heroTileItem'),
	template = _.template(tpl);

	return Backbone.View.extend({

		//TODO: make this work with dynamic data
		initialize : function () {
			var me = this;
			$.getJSON("../../data/heroes.json", function (data) {
				var filteredData = _.pick(data, function (value, key, object) {
						return (key.indexOf('npc_dota_hero') !== -1);
					});
				me.setCollection(_.values(filteredData));
			});
		},

		setCollection : function (data) {
			console.log(data);
			this.heroesCollection = new models.HeroCollection(data);
			this.render();
		},

		render : function () {
			this.$el.html(template());
			//TODO: backbonify this .. jquerying it for now
			if (this.heroesCollection != null) {
				this.heroesCollection.each(function (hero) { // iterate through the collection
					var heroTile = new HeroTileItem();
					heroTile.render();
					var heroesListView = $('.heroesList');
					if (hero.has('url')) {
						var heroName = hero.get('url');
						var heroImg = heroName.toLowerCase();

						//[TODO] Pass through this only if PNG is not found
						//Names of Heroes messed up in npc_heroes_txt
						//[TODO] Maybe build an alias for heroes to fallback on using hero.NameAliases
						//Check if file exists in anoy of the aliases, or with underscores etc
						if (heroName.toLowerCase() === "windranger") {
							heroName = "WindRunner";
							heroImg = heroName.toLowerCase();
						} else if (heroName.toLowerCase() === "zeus") {
							heroImg = "zuus";
						} else if (heroName.toLowerCase() === "natures_prophet") {
							heroImg = "furion";
						} else if (heroName.toLowerCase() === "anti-mage") {
							heroImg = "antimage";
						} else if (heroName.toLowerCase() === "necrophos") {
							heroImg = "necrolyte";
						} else if (heroName.toLowerCase() === "wraith_king") {
							heroImg = "skeleton_king";
						} else if (heroName.toLowerCase() === "shadow_fiend") {
							heroImg = "nevermore_alt1";
						} else if (heroName.toLowerCase() === "clockwerk") {
							heroImg = "rattletrap";
						} else if (heroName.toLowerCase() === "lifestealer") {
							heroImg = "life_stealer";
						} else if (heroName.toLowerCase() === "outworld_devourer") {
							heroImg = "obsidian_destroyer";
						} else if (heroName.toLowerCase() === "treant_protector") {
							heroImg = "treant";
						} else if (heroName.toLowerCase() === "io") {
							heroImg = "wisp";
						} else if (heroName.toLowerCase() === "magnus") {
							heroImg = "magnataur";
						} else if (heroName.toLowerCase() === "timbersaw") {
							heroImg = "shredder";
						} else if (heroName.toLowerCase() === "abyssalunderlord") {
							heroImg = "default_32";
						} else if (heroName.toLowerCase() === "centaur_warrunner") {
							heroImg = "centaur";
						} else if (heroName.toLowerCase() === "oracle") {
							heroImg = "default_32";
						} else if (heroName.toLowerCase() === "vengeful_spirit") { //remove underscores
							heroImg = "vengefulspirit";
						} else if (heroName.toLowerCase() === "queen_of_pain") {
							heroImg = "queenofpain";
						}
						// CLEAN THIS UP ^

						//console.log("Loading minihero image: " + heroName.toLowerCase() + ".png");
						var repl = /_/gi;
						heroesListView.append("<tr><td><img src='assets/images/miniheroes/" + heroImg + ".png'></img>" + heroName.replace(repl, ' ') + "</td>" +
							"<td>" + hero.get('Role') + "</td></tr>");
					}
					//var contactView = new ContactView({model: contact});
					//self.$el.append(contactView.el);
				});
			}
			return this;
		}

	});

});
