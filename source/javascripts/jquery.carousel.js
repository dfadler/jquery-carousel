(function ($) {
	
	'use strict';
	
	$.fn.carousel = function (options) {

		return this.each(function () {

			$(this)
				.wrapInner('<div class="stage" />');
			
			var $this = this,
				stage = $('.stage', $this),
				visibleArticles = 3,
				articles = stage.children(),
				articlesWidth = stage.children().width(),
				articlesCount = articles.length,
				loop = true
				

			function cloneArticles(window, cloneFirst, cloneLast) {
					cloneFirst = $(articles)
									.clone()
									.slice(0, window);
					cloneLast = $(articles)
									.clone()
									.slice(-window);
					stage
						.prepend(cloneLast)
						.append(cloneFirst);
			}
			
			if (loop) {
				cloneArticles(visibleArticles);
				articles = stage.children();
			}
						
			stage
				.css({
					'width': articlesWidth * articlesCount
				});
				
			
			
		});
	}
	
	// Carousel default options
	$.fn.carousel.defaults = {
		articleSelector: null,
		controls: false
	};
	
})(jQuery);