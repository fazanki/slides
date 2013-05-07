define(['backbone'], function(Backbone){
	
	var Slide = Backbone.View.extend({
		
		className: 'slide',

		render: function() {

			if ( this.model.get('image') ) {
				this.renderImage();
			}

			var size = this.model.get('size');
			this.$el.append(
				'<h1 class="'+ size +'">' + this.model.get('title') + '</h1>'
			);

		return this;
		
		},

		renderImage: function() {
			this.$el
			.addClass('image')
			.append(
				'<img src="' + this.model.get('image') + '" />'
			);
		}
	});

	return Slide;
});