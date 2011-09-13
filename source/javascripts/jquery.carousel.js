(function ($) {
	
	'use strict';
	
	$.fn.carousel = function (options) {

		return this.each(function () {
			
			// Carousel Object
			function Carousel(cont, opts) {
				this.section = cont;
				this.sectionHeight = $(this.section).outerHeight(),
				this.sectionWidth = $(this.section).outerWidth(),
				
				// Wraps articles with window and stage divs needed for animation
				$(this.section).wrapInner('<div class="window"><div class="stage"></div></div>');
				
				this.window = $('.window', this.section);
				this.stage =  $('.stage', this.section);
				this.settings = $.extend({}, $.fn.carousel.defaults, opts);
				
				this.articlesPre = $('.window .stage', this.section).children();

				// Clones then appends/prepends first and last articles needed for carousel
				$(this.articlesPre)
					.slice(0, 2)
					.clone()
					.appendTo(this.stage);
				$(this.articlesPre)
					.slice(-2)
					.clone()
					.prependTo(this.stage);
				
				// 
				this.articles = $('.window .stage', this.section).children();
				
				if(this.settings.controls) {
					$(this.section)
						.append('<div class="control-panel" />');
					
					$('.control-panel', this.section)
						.css({
							'position': 'absolute',
							'top': 0,
							'left': 0,
							'height': this.sectionHeight,
							'width': this.sectionWidth
						});
					
					if (this.settings.controls[0]) {
						$('.control-panel', this.section)
							.append('<div class="controls-container"><ul class="controls" /></div>');
						$(this.articlesPre)
							.each(
								function(i) {
									$('.controls', this.section)
										.append('<li class="control"><span>' + i + '</span></li>');
								}
							);
						$('.controls .control:first', this.section)
							.addClass('active');
					}
					
					if (this.settings.controls[1]) {
						$('.control-panel', this.section)
							.append('<div class="prev-container"><span class="prev">Prev</span></div><div class="next-container"><span class="next">Next</span></div>')
					}
				}
				
			}
			
			// Variable Assignment
			var $this = this,
				carousel = new Carousel($this, options),
				section = carousel.section,
				sectionHeight = carousel.sectionHeight,
				sectionWidth = carousel.sectionWidth,
				stage = carousel.stage,
				articles = carousel.articles,
				indexedArticles = carousel.articlesPre,
				firstArticle = articles[1],
				lastArticle = articles[articles.length - 2];
				
			if ($(section).css('position') === 'static') {
				$(section)
					.css({
						'position': 'relative'
					});
			}
				
			$(stage)
				.css({
					'width': ($(articles).outerWidth() + parseInt($(articles[1]).css('margin-left'))) * (articles.length + 1),
					'position': 'relative',
					'left': -(($(articles).outerWidth() + parseInt($(articles[1]).css('margin-left'))) * 2)
				});
				
			$(articles)
				.css({
					'float': 'left'
				});
				
			$(indexedArticles)
				.each(
					function (i) {
						
					}
				);
			
			function goto() {
				
			}
			
			function advance() {
				
			}
			
		});

	}
	
	// Carousel default options
	$.fn.carousel.defaults = {
		articleSelector: null,
		controls: false
	};
	
})(jQuery);