require.config({

    baseUrl: '../lib',

    paths: {
        app: '../js/app',
		tpl: '../tpl'
    },

    shim: {
        'backbone/backbone': {
            deps: ['underscore/underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore/underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone/backbone', 'app/router', 'flat-ui/dist/js/flat-ui'], function ($, Backbone, Router, FlatUI) {
    var router = new Router();
    Backbone.history.start();
});