define(function (require) {

  "use strict";
	
  var $	= require('jquery'),
	Backbone = require('backbone/backbone'),
	HomeView = require('app/views/home');
	
  var $body = $('body'),
	  homeView = new HomeView({el: $body});
  
  return Backbone.Router.extend({
	routes: {
            "": "home",
			"heroes": "heroes"
	},
	
	 home: function () {
		console.log("Congratulations! You've fuckin' made it home.");
		homeView.delegateEvents(); // delegate events when the view is recycled
        homeView.render();
	 },//,
	 
	 heroes: function() {
        require(["app/views/heroes"], function (HeroesView) {
	      console.log("I'm supposed to show 'em fuckin heroes");
		  var $container = $('#content');
          var view = new HeroesView({el: $container});
          view.render();
		});
	 }
  });
  
});