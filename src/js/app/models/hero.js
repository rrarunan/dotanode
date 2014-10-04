
define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone/backbone');

	var Hero = Backbone.Model.extend({
	  defaults: {
		"name":  "base hero",
		"role":  "base role",
		"team":  "Good"
	  },
	  urlRoot: "http://localhost:8000/heroes"
	});
	
	var HeroCollection = Backbone.Collection.extend({
      model: Hero,
      url: "http://localhost:8000/heroes"
    });
	
	return {
        Hero: Hero,
        HeroCollection: HeroCollection
    };

});