(function ($) {
	
	'use strict';
	
	$.fn.carousel = function (options) {

		return this.each(function () {

			$(this)
				.wrapInner('<div class="window"><div class="stage" /></div>');

			var $this = this,
				thisWidth = $($this).width(),
				thisHeight = $($this).height(),
				stage = $('.stage', $this),
				stagePosition = null,
				visibleArticles = 3,
				articles = stage.children(),
				articlesWidth = $(articles).outerWidth() + parseInt($(articles[1]).css('margin-left')),
				articlesHeight = stage.children().height(),
				articlesCount = articles.length,
				firstArticle = visibleArticles,
				lastArticle = articlesCount - visibleArticles,
				currentArticle = visibleArticles,
				animationSpeed = 300,
				opts = $.extend({}, $.fn.carousel, options),
				loop = true,
				controlPanel = null,
				i = null;
				
			function generateControls(controls) {
				if (controls === 0) {
					controlPanel
						.append('<div class="controls-container"><ul class="controls"></ul></div>');
					$(articles)
						.each(
							function (i) {
								$('.controls', $this)
									.append('<li class="control"><span>' + (i + 1) + '</span></li>');
							}
						);
				} else {
					$(controlPanel)
						.append('<div class="prev-container"><span class="prev">Prev</span></div><div class="next-container"><span class="next">Next</span></div>');
				}
			}
				
			if (opts.controls) {
				
				$($this)
					.append('<div class="control-panel" />');
				
				controlPanel = $('.control-panel', $this);
				
				controlPanel
					.css({
						'position': 'absolute',
						'height': articlesHeight,
						'width': thisWidth
					});
				
				for (i = 0; i <= opts.controls.length; i += 1) {
					if (opts.controls[i]) {
						generateControls(i);
					}
				}
			}

			function cloneArticles(window, cloneFirst, cloneLast) {
				cloneFirst = $(articles).clone().slice(0, window);
				cloneLast = $(articles).clone().slice(-window);
				stage
					.prepend(cloneLast)
					.append(cloneFirst);
			}
			
			function positionStage(i, clone) {
				if (clone) {
					$('.window', $this)
						.stop(true)
						.animate({
							scrollLeft: i * articlesWidth
						},
						500,
						function () {
							$('.window', $this)
								.scrollLeft(clone * articlesWidth);
						}
						);
					currentArticle = clone;
				} else {
					$('.window', $this)
						.stop(true)
						.animate({
							scrollLeft: i * articlesWidth
						},
						500
						);
				}
			}

			if (loop) {
				cloneArticles(visibleArticles);		
				articles = stage.children();
				articlesCount = articles.length;
				lastArticle = articlesCount - visibleArticles
				$('.window', $this)
					.scrollLeft(visibleArticles * articlesWidth);
			}

			if (opts.controls) {
				$('.next, .prev', controlPanel)
					.bind(
						'click',
						function (e, direction, clonedArticle) {
							clonedArticle = false;
							if($(this).attr('class') === 'prev') {
								currentArticle -= 1;
								console.log('Prev');
								if (currentArticle < firstArticle) {
									console.log('inner prev');
									clonedArticle = lastArticle - 1;
								}
							} else {
								currentArticle += 1;
								console.log('next');
								if (currentArticle > lastArticle) {
									console.log('inner next');
									clonedArticle = firstArticle + 1;
								}
							}
							e.stopPropagation();
							positionStage(currentArticle, clonedArticle);
							console.log(currentArticle);
						}
					);
				$('.control', controlPanel)
					.bind(
						'click',
						function (e) {
							e.stopPropagation();
						}
					);	
			}	
			
		});
	};
	
	// Carousel default options
	$.fn.carousel.defaults = {
		articleSelector: null,
		controls: false
	};
	
})(jQuery);