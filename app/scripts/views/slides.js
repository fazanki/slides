define(['backbone', 'views/slide'], function(Backbone, SlideView){
	

	var SlidesView = Backbone.View.extend({
		
		el: $('.slides'),

		initialize: function() {

			this.currentSlideIndex = 1;
			this.numSlides = this.collection.length;
			this.transitionSpeed = 400;
			
			this.renderAll();

			App.Vent.on('init', this.hideAllButFirst, this);
			App.Vent.on('changeSlide', this.changeSlide, this);
		},

		hideAllButFirst: function() {
			this.$el.children(':nth-child(n+2)').hide();
		},

		changeSlide: function(opts) {

			var newSlide;
			var slides = this.$el.children();
			var self = this;
			console.log(opts);
			

			this.setCurrentSlideIndex(opts);
			
			// fileter the new slide
			/// VERY IMPORTANT !!! THIS IS WHRE ALL THE LOGGIC IS HAPPENING 
			/// AND FIGURING WHICH SLIDE WE ARE WORKING ON
			newSlide = slides.eq(this.currentSlideIndex - 1);

			newSlide = this.getNextSlide(slides);
			//console.log( newSlide )
			//slides.css('position','absolute')// TEMPORARY

			this.animateToNewSlide(slides, newSlide, opts.direction);

			App.router.navigate('/slides/' + this.currentSlideIndex);
		},

		setCurrentSlideIndex: function(opts) {

			if (opts.slideIndex) {
				//debugger;
				return this.currentSlideIndex += ~~opts.slideIndex;
			}

			this.currentSlideIndex += (opts.direction === 'next') ? 1 : -1;
			
			if( this.currentSlideIndex > this.numSlides ) {
				// go back to slide 1
				this.currentSlideIndex = 1;
			}
			if ( this.currentSlideIndex <= 0) {
				
				this.currentSlideIndex = this.numSlides;
			}
		},

		animateToNewSlide: function(slides, newSlide, direction) {

			slides.filter(':visible')
				.animate({
					top: direction === 'next' ? '100%' : '-100%',
					//top: '-100%',
					opacity: 'hide'
				}, this.transitionSpeed, function() {
					$(this).css('top','0');

					newSlide
						.css('top', direction ==='next' ? '-100%' : '100%')
						.animate({
							top:0,
							opacity: 'show'
						}, self.transitionSpeed);
				});

		},

		getNextSlide: function(slides) {
			return slides.eq(this.currentSlideIndex - 1);

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
