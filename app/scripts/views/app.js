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

        initialize: function() {
            var testCollection = [
                {title: "My First Slide"},
                {title: "My Second Slide"}
            ];
            
            new SlidesView({
                collection: new SlidesCollections(testCollection)
            });


            App.router = new MainRouter();
            Backbone.history.start();
        }


    });

    return AppView;
});