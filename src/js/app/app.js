require.config({

	baseUrl : '../lib',

	paths : {
		app : '../js/app',
		tpl : '../tpl',
		/* path to folder where individual bootstrap files have been saved. (affix.js, alert.js, etc) */
        bootstrap: '../lib/bootstrap/js',
		imagesloaded: '../lib/imagesloaded'
	},

	shim : {
		'backbone/backbone' : {
			deps : ['underscore/underscore', 'jquery'],
			exports : 'Backbone'
		},
		'underscore/underscore' : {
			exports : '_'
		},
		'mustache/mustache' : {
			exports : 'Mustache'
		},
		'masonry/masonry': {
			deps: ['jquery', 'jquery-bridget/jquery.bridget'],
			exports: 'Masonry'
		},
		'bignumber': {
			exports: 'BigNumber'
		},
		'bootstrap/dropdown': {
			deps: ['jquery'],
			exports: '$.fn.dropdown'
		},
		'imagesloaded/imagesloaded': {
			exports: 'ImagesLoaded'
		}
	}
});

require(['backbone/backbone', 'app/router'], function (Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});