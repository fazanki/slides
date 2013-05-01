define(['backbone', 'views/slides', 'collections/slides',], function(Backbone, SlidesView, SlidesCollections) {
    
    var AppView = Backbone.View.extend({

        initialize: function() {
            var testCollection = [
                {title: "My First Slide"},
                {title: "My Second Slide"}
            ];
            
            new SlidesView({
                collection: new SlidesCollections(testCollection)
            });
        }
    });

    return AppView;
});