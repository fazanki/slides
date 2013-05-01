define(['backbone', 'views/slide'], function(Backbone, SlideView){
	

	var SlidesView = Backbone.View.extend({
		
		el: $('.slides'),

		initialize: function() {
			this.renderAll();
		},

		renderAll: function() {
			//console.log(this.collection);
			this.$el.empty();
			this.collection.each(this.render, this);
		},

		render: function(slide) {
			var slideView = new SlideView({ model: slide });
			this.$el.append(slideView.render().el);
			return this;
		}

	});

	return SlidesView;

});
