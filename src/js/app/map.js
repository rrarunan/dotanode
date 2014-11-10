define(function (require) {

	"use strict";
	
	var dataMap = {
		heroRaw: {},
		itemRaw: {},
		heroMap: {},
		itemMap: {},
	};
	
	dataMap.createLUTs = function() {
	
		//Parse and set hero lookup
		if( !_.isEmpty(this.heroRaw) ) {
			//assume heroes have been populated correctly
			var heroKeys = _.keys(this.heroRaw);
			var heroVals = _.values(this.heroRaw);
			_.each( heroVals, function(element, index, list) {
				//element = hero
				//add hero images links to element object & add a link to the hero_id on the map
				//3 sets of images
				//////////////////
				var heroName = element.url;
				if(heroName != null) {
					//Mini heroes
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
					
					element.miniImg = 'assets/images/miniheroes/' + heroImg + '.png';
					element.mainImg = 'assets/images/heroes/' + heroImg + '.png';
					//get current key by index (eg. npc_dota_hero_abaddon)
					element.selImg = 'assets/images/selectionheroes/' + heroKeys[index] + '.png';
					element.npcName = heroKeys[index];
				}
				
				//Set the hero object to a map of the hero_id
				if(element.HeroID) {
					dataMap.heroMap[element.HeroID] = element;
					//console.log("Added hero: " + heroKeys[index] + " to DataMap with Hero ID = " + element.HeroID);
				}
			});
		}
		
		//Parse and set item lookup
		if( !_.isEmpty(this.itemRaw) ) {
			var itemKeys = _.keys(this.itemRaw);
			var itemVals = _.values(this.itemRaw);
			
			_.each( itemVals, function(element, index, list) {
				var itemKeyArr = itemKeys[index].split('item_');
				if(itemKeyArr != null && itemKeyArr.length > 1) {
					var itemName = itemKeyArr[1].toString();
					//console.log("Item name: " + itemName);
					element.img = 'assets/croppedImages/items/' + itemName + '.png';
				}
				//set lookup by item ID
				if (element.ID) {
					dataMap.itemMap[element.ID] = element;
				}
			});
		}
	}
	

	return dataMap;
});