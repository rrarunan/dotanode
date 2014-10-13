define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/MatchDetails.html'),
	dataMap = require('app/map'),
	template = _.template(tpl);

	return Backbone.View.extend({
	
		getItems: function(items) {
			var itemImgs = [];
			if ( items.length > 0 && !(_.isEmpty(dataMap.itemMap)) ) {
				_.each(items, function(item, idx, list) {
					var itemDetails = dataMap.itemMap[item];
					if(itemDetails != null) {
						itemImgs.push( itemDetails.img );
					} else {
						itemImgs.push( 'assets/images/items/emptyitembg.png' );
					}
				});
			}
			return itemImgs;
		},

		//model is being passed down from router
		render : function (matchDetails) {
			var players = matchDetails.players;
			var me = this;
			_.each(players, function(player){
				var currHero = dataMap.heroMap[player.hero_id];
				//Player Account ID: 4294967295 -> Set to Private
				//console.log("setting hero img for ->" +  player.hero_id + ":" + currHero.npcName + "=" + currHero.miniImg);
				player.heroImg = currHero.miniImg;
				player.itemImgs = me.getItems([player.item_0, player.item_1, player.item_2, player.item_3, player.item_4, player.item_5]);
			});
			me.$el.html(template(matchDetails));
			return me;
		}

	});

});
