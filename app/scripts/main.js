'use strict';

require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        backbone: '../components/backbone/backbone',
        underscore: '../components/underscore/underscore',
        prettify: '../components/google-code-prettify/src/prettify'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }

         
    }
});

require(['views/app', 'prettify'], function(AppView){
    window.App = {
        Vent: _.extend({}, Backbone.Events)
    };


    new AppView();
    
});
