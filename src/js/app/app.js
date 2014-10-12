require.config({

	baseUrl : '../lib',

	paths : {
		app : '../js/app',
		tpl : '../tpl'
	},

	shim : {
		'backbone/backbone' : {
			deps : ['underscore/underscore', 'jquery'],
			exports : 'Backbone'
		},
		'underscore/underscore' : {
			exports : '_'
		},
		'backgrid/lib/backgrid' : {
			deps : ['underscore/underscore', 'jquery', 'backbone/backbone'],
			exports : 'Backgrid'		
		},
		'mustache/mustache' : {
			exports : 'Mustache'
		}
	}
});

require(['backbone/backbone', 'app/router'], function (Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});