define([
    'backbone', 
    'views/slides', 
    'collections/slides',
    'router'
    ], function(
        Backbone, 
        SlidesView, 
        SlidesCollections, 
        MainRouter

        ) {
    
    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            console.log(window.slides);
            new SlidesView({
                collection: new SlidesCollections(window.slides)
            });


            App.router = new MainRouter();
            Backbone.history.start();
        },

        events: {
            'keyup': 'keyUp'
        },

        keyUp: function(e) {
            // 37 left 
            // 39 right
            if (e.keyCode === 37 || e.keyCode === 39) {
                App.Vent.trigger('changeSlide', {
                    direction: e.keyCode === 39 ? 'next' : 'prev'
                });
            }
        }


    });

    return AppView;
});