require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        backbone: '../components/backbone/backbone',
        underscore: '../components/underscore/underscore'
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

require(['views/app'], function(App){
    new App()
});