define(['backbone'], function(Backbone){
	
	var Slide = Backbone.View.extend({
		
		className: 'slide',

		template: _.template($('#quote').html()),
		// 	quote: function() {
		// 		return App.Templates('quote');	
		// 	}
		// },

		render: function() {

			if ( this.model.get('image') ) {
				this.renderImage();
			} else if ( this.model.get('quote')) {
				this.renderQuote();
			} else if (this.model.get('bullets')) {
				this.renderBullets();
			} else {
				this.renderHeading();
			}

		return this;
		
		},

		renderHeading: function() {
			var size = this.model.get('size');
			this.$el.append(
				'<h1 class="'+ size +'">' + this.model.get('title') + '</h1>'
			);
		},

		renderImage: function() {
			this.$el
			.addClass('image')
			.append(
				'<img src="' + this.model.get('image') + '" />'
			);
		},

		renderBullets: function() {
			var el = this.$el;
			el.addClass('bullets');

			if ( this.model.get('title') ) {
				el.append(
					'<h1>'  + this.model.get('title') + '</h1>'
				)

			}

			el.append([
				'<ul>',
					'<li>' + this.model.get('bullets').join('</li><li>'),
				'</ul>',
				].join('') 
			);
		},

		renderQuote: function() {
		
			var template = this.template(this.model.toJSON());
			this.$el
				.addClass('quote')
				.append(
					template
				); 
		}
	});

	return Slide;
});