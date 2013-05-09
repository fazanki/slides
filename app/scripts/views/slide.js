define(['backbone', 'helpers'], function(Backbone, Helpers){
	
	var Slide = Backbone.View.extend({
		
		className: 'slide',

		template: _.template($('#quote').html()),
		// 	quote: function() {
		// 		return App.Templates('quote');	
		// 	}
		// },

		render: function() {
			
			var contentType = this.getContentType();

			this['render'+Helpers.capitalize(contentType)]();

		return this;
		
		},

		getContentType: function() {

			if ( this.model.get('image') ) {
				return 'image';
				//this.renderImage();
			} else if ( this.model.get('snippet') ) {
				return 'snippet';
				//this.renderSnippet()
			} else if ( this.model.get('quote') ) {
				return 'quote';
				//this.renderQuote();
			} else if ( this.model.get('bullets') ) {
				return 'bullets';
				//this.renderBullets();
			} else {
				return 'heading';
				//this.renderHeading();
			}

		},

		renderHeading: function() {
			var size = this.model.get('size');
			this.$el.append(
				'<h1 class="'+ size +'">' + this.model.get('title') + '</h1>'
			);
		},

		renderSnippet: function() {
			var self = this;
			var snippet = this.model.get('snippet');
			
			if ( this.model.get('title') ) {
				this.renderHeading()
			}

			if ( $.isPlainObject(snippet)) { /// IMPORTANT TO REMEMBER 
				/// USING JQUERY ISPLAINOBJECT TO TO CHECK IF IS AN OBJECT

				return _.each(snippet, function(snippetPath, heading) {
					self.setSnippet(snippetPath, heading);
				});

			}

			this.setSnippet(snippet);

		},

		setSnippet: function(snippetPath, heading) {
			var self = this;
			
			var title = heading ? '<h1>' + heading + '</h1>' : '';
			// if ( heading ) {
			// 	self.$el.append('<h1>' + heading + '</h1>')
			// }

			$.get(snippetPath, function(snippet) {
				self.$el
					.addClass('snippet')
					.append([
						title,
						'<pre class="prettyprint">' + _.escape(snippet) + '</pre>'
					].join(''));
				prettyPrint();
			});

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