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
				articlesWidth = stage.children().width(),
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
				
			if ($($this).css('position') === 'static') {
				$($this)
					.css({
						'position': 'relative'
					});
			}
			
			// if($('.window', $this).css('overflow') !== 'hidden') {
			// 	$('.window', $this)
			// 		.css({
			// 			'overflow': 'hidden'
			// 		});
			// }
				
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
			
			function positionStage(left, css) {
				
				// switch (currentArticle) {
				// case firstArticle - 1:
				// 	currentArticle = lastArticle - 1;	
				// 	left = parseInt(stagePosition) + articlesWidth;
				// 	stage
				// 		.stop(true)
				// 		.animate({
				// 			'left': left 
				// 		}, 
				// 		animationSpeed,
				// 		function () {
				// 			stage
				// 				.css({
				// 					'left': -(articlesWidth * (lastArticle - 1))
				// 				});
				// 		}
				// 		);
				// 	break;
				// case lastArticle + 1:
				// 	currentArticle = firstArticle + 1;
				// 	stage
				// 		.css({
				// 			'left': -(articlesWidth * (visibleArticles + 1))
				// 		});
				// 	left = parseInt(stagePosition) - articlesWidth;
				// 	stage
				// 		.stop(true)
				// 		.animate({
				// 			'left': left
				// 		},
				// 		animationSpeed,
				// 		function () {
				// 			
				// 		}
				// 		);
					// break;
				// if (!css) {
				// 	stage
				// 		.stop(true)
				// 		.animate({
				// 			'left': left
				// 		}, 
				// 		animationSpeed
				// 		);
				// } else {
					
					stage
						.stop(true)
						.animate({
							'left': left
						},
						animationSpeed
						);
				// }
			}
			
			if (loop) {
				cloneArticles(visibleArticles);		
				articles = stage.children();
				articlesCount = articles.length;
				lastArticle = articlesCount - visibleArticles
				positionStage(-(articlesWidth * visibleArticles));	
			}
						
			stage
				.css({
					'width': articlesWidth * articlesCount
				});
				
			if (stage.css('position') === 'static') {
				stage
					.css({
						'position': 'relative'
					});
			}

			if (opts.controls) {
				$('.next, .prev', controlPanel)
					.bind(
						'click',
						function (e, direction, clone) {
							stagePosition = stage.css('left');	
							
							switch ($(this).attr('class')) {
							case 'prev':
								currentArticle -= 1;
								direction = parseInt(stagePosition) + articlesWidth;
								break;
							case 'next':
								currentArticle += 1;
								direction = parseInt(stagePosition) - articlesWidth;
								break;
							default:
								break;
							}
							
							console.log(currentArticle, direction, lastArticle);
							e.stopPropagation();
							if (currentArticle < firstArticle) {
								console.log('if');
								currentArticle = lastArticle;
								clone = -(articlesWidth * (lastArticle));
								stage
									.css({
										'left': clone
									});
									
								positionStage(direction);
							} else if(currentArticle > lastArticle) {
								console.log('if else');
								currentArticle = firstArticle;
								clone = -(articlesWidth * (visibleArticles + 1));
								positionStage(direction, clone);
							} else {
								console.log('else');
								positionStage(direction);
							}
						}
					);
				$('.control', controlPanel)
					.bind(
						'click',
						function (e) {
							e.stopPropagation();
							positionStage();
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