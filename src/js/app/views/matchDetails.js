define(function (require) {

	"use strict";

	var $ = require('jquery'),
	_ = require('underscore/underscore'),
	Backbone = require('backbone/backbone'),
	tpl = require('text/text!tpl/MatchDetails.html'),
	dataMap = require('app/map'),
	BigNumber = require('bignumber'),
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
			var steamIds = [];
			var steamId32to64Map = {};
			var steamId64to32Map = {};
			_.each(players, function(player){
				var currHero = dataMap.heroMap[player.hero_id];
				//Player Account ID: 4294967295 -> Set to Private
				//My ID: 76561197988729271
				/*
				In order to convert from these 32-bit numbers to Steam Names, you must first convert between the 32-bit ID and 64-bit ID:
				On a system that supports up to 64-bit numbers you can do the following:
				STEAMID64 - 76561197960265728 = STEAMID32
				STEAMID32 + 76561197960265728 = STEAMID64
				OR
				STEAMID32 = The right-most 32-bits of STEAMID64
				STEAMID64 = concatenate("00000001000100000000000000000001", STEAMID32);
				On a system that only supports up to 32-bit numbers - it's trickier. You have to rely on the language's built-in "big number" functions (i.e. PHP's gmp extension: see this post for details)
				Once you have the 64-bit ID, then you can use the GetPlayerSummaries call to get their detail!
				*/
				//console.log("setting hero img for ->" +  player.hero_id + ":" + currHero.npcName + "=" + currHero.miniImg);
				if (player.account_id !== 4294967295) {
					var STEAM_DEFAULT = new BigNumber("76561197960265728");
					var STEAMID32 = new BigNumber(player.account_id);
					var STEAMID64 = STEAM_DEFAULT.add(STEAMID32).toString();
					steamIds.push(STEAMID64);
					steamId64to32Map[STEAMID64] = STEAMID32;
					console.log( "Player Steam ID = " + STEAMID64 );
				}
				player.heroImg = currHero.miniImg;
				player.itemImgs = me.getItems([player.item_0, player.item_1, player.item_2, player.item_3, player.item_4, player.item_5]);
			});
			//[TODO:]Constantify the URLs
			var playersJson = $.get('http://localhost:9002/players?steamids=' + steamIds.toString(),
			function(data) {
				var playersInfo = data.response.players;
				var playersData = {};
				if(playersInfo) {
					_.each(playersInfo, function(playerInfo) {
						if(playerInfo.steamid != null) {
							var steam32ID = steamId64to32Map[playerInfo.steamid]
							if (steam32ID != null) {
								playersData[steam32ID] = playerInfo;
							}
						}
					});
				}
				matchDetails.playersData = playersData;
				me.$el.html(template(matchDetails));
				//console.log("Players\n" + JSON.stringify(data));
			}, "json");
			return me;
		}

	});

});
