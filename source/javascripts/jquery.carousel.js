(function ($) {
	
	'use strict';
	
	$.fn.carousel = function (options) {

		return this.each(function () {
			
			// Carousel object 
			function Carousel(cont, opts) {
				
				this.section = cont;
				this.containerWidth = $(cont).width();
				this.containerHeight = $(cont).height();
				this.settings = $.extend({}, $.fn.carousel.defaults, opts);
				this.articles = this.settings.articleSelector ? $(this.settings.articleSelector, this.section) : $(this.section.children).splice(0, this.section.children.length);
				this.controlPanel = null;
				this.aside = this.settings.aside ? $(this.settings.aside, this.section) : null;
			}
			
			// Variable Assignment 
			var that = this,
				carousel = new Carousel(that, options),
				opts = carousel.settings,
				section = carousel.section,
				sectionWidth = $(section).width(),
				sectionHeight = $(section).height(),
				articles = carousel.articles,
				currentArticle = 0,
				lastArticle = articles.length - 1,
				controlPanel = carousel.controlPanel,
				controlsEvent = opts.controlEvent ? 'click'  : 'mouseover',
				carouselActive = null,
				interval = null;
				
			// console.log();
			
			if ($(section).css('position') === 'static') {
				$(section)
					.css({
							'position':'relative'
					});
			}
			
			$(section)
				.wrapInner('<div class="window"><div class="stage"></div></div>')
			
			$('.stage', section)
				.css({
					'width': $(articles[0]).width() * (lastArticle + 1),
					'position': 'relative'
				});
			
			$(articles)
				.css({
					'float':'left'
				});
			
			// carousel method to add control panel and corresponding property
			Carousel.prototype.generateControlPanel = function () {
				
				$(section)
					.append('<div class="control-panel" />');
					
				controlPanel = $('.control-panel', section);
				
					if (opts.controls[0]) {
						$(controlPanel)
							.append('<div class="controls-container"><ul class="controls"></ul></div>');

						$(articles)
							.each(
								function (i) {
									$('.controls', section)
										.append('<li class="control"><span>' + i + '</span></li>');
								}
							);

						$(controlPanel)
							.find('.controls .control:eq(0)')
							.addClass('active');
					}
				
					if (opts.controls[1]) {
						$(controlPanel)
							.append('<div class="prev-container"><span class="prev">Prev</span></div><div class="next-container"><span class="next">Next</span></div>');
					}
					
					console.log(controlPanel);
			};
			
			if(opts.controls) {
				
				carousel.generateControlPanel();
				
			}
			// Needed for styling clickable containers if there are multiple instances of the carousel on one page
			if (opts.sectionEvent[0]) {
				$(section)
					.addClass('clickable');
			}
			
			// Disables next/prev if loop is false and have reached the end of the carousel
			function toggleNextPrev(obj, bol) {
				if (bol) {
					$(obj, controlPanel).addClass('disabled');
				} else {
					$(obj, controlPanel).removeClass('disabled');
				}
			}
			
			// Animation and class progression
			function go(nextArticle) {
				
				// if (captions) {
				// 	toggleCaptions(false);
				// 
				// 	$(captions)
				// 		.removeClass('active');
				// 	
				// 	$(captions[nextSlide])
				// 		.addClass('active');
				// }
				if (opts.controls) {
					$('.active', controlPanel)
						.removeClass('active');
				
					$('.controls .control:eq(' + nextArticle + ')', controlPanel)
						.addClass('active');
				}
					
				$(articles)
					.removeClass('active')
					.css({
						'z-index': 1
					});
				
				$(articles[nextArticle])
					.addClass('active')
					.css({
						'z-index': 2
					});
				
				$('.stage', section)
					.stop(true)
					.animate(
						{
							'left': -$(articles).width() * currentArticle
						}, 
						{
							duration: opts.speed
						}
						// toggleCaptions(true)
					);
				
				
				// switch (opts.slideAnimation) {
				// 
				// case 'slide':
				// 	if (captions) {
				// 		toggleCaptions(false);
				// 		
				// 		$(captions)
				// 			.removeClass('active');
				// 			
				// 		$(captions[nextSlide])
				// 			.addClass('active');
				// 	}
				// 	$('.active', controlPanel)
				// 		.removeClass('active');
				// 		
				// 	$('.controls .control:eq(' + nextSlide + ')', controlPanel)
				// 		.addClass('active');
				// 		
				// 	$(slides)
				// 		.removeClass('active')
				// 		.css({
				// 			'z-index': 1
				// 		});
				// 		
				// 	$(slides[nextSlide])
				// 		.addClass('active')
				// 		.css({
				// 			'z-index': 2
				// 		});
				// 		
				// 	$('.stage', container)
				// 		.stop(true)
				// 		.animate(
				// 			{
				// 				'left': -contWidth * currentSlide
				// 			}, 
				// 			{
				// 				duration: opts.speed
				// 			}, 
				// 			toggleCaptions(true)
				// 		);
				// 	break;
				// 
				// case 'fade':
				// 	if (captions) {
				// 		toggleCaptions(false);
				// 		
				// 		$(captions)
				// 			.removeClass('active');
				// 			
				// 		$(captions[nextSlide])
				// 			.addClass('active');
				// 			
				// 		toggleCaptions(true);	
				// 	}
				// 	
				// 	$('.active', controlPanel)
				// 		.removeClass('active');
				// 		
				// 	$('.controls .control:eq(' + nextSlide + ')', controlPanel)
				// 		.addClass('active');
				// 		
				// 	$(slides)
				// 		.removeClass('active')
				// 		.css({
				// 			'z-index': 1
				// 		})
				// 		.stop(true)
				// 		.animate(
				// 			{
				// 				'opacity': 0
				// 			}, 
				// 			{
				// 				duration: opts.speed
				// 			}
				// 		);
				// 		
				// 	$(slides[nextSlide])
				// 		.addClass('active')
				// 		.css({
				// 			'z-index': 2
				// 		})
				// 		.stop(true)
				// 		.animate(
				// 			{
				// 				'opacity': 1
				// 			},
				// 			{
				// 				duration: opts.speed
				// 			},
				// 			toggleCaptions(true)
				// 		);
				// 	break;
				// 
				// default:
				// 	if (captions) {
				// 		toggleCaptions(false);
				// 		
				// 		$(captions)
				// 			.removeClass('active')
				// 			.css({
				// 				'opacity': 0,
				// 				'z-index': 1
				// 			});
				// 			
				// 		$(captions[nextSlide])
				// 			.addClass('active')
				// 			.css({
				// 				'opacity': 1,
				// 				'z-index': 2
				// 			});
				// 			
				// 		toggleCaptions(true);	
				// 	}
				// 	
				// 	$('.active', controlPanel)
				// 		.removeClass('active');
				// 		
				// 	$('.controls .control:eq(' + nextSlide + ')', controlPanel)
				// 		.addClass('active');
				// 		
				// 	$(slides)
				// 		.removeClass('active')
				// 		.css({
				// 			'opacity': 0,
				// 			'z-index': 1
				// 		});
				// 		
				// 	$(slides[nextSlide])
				// 		.addClass('active')
				// 		.css(
				// 			{
				// 				'opacity': 1,
				// 				'z-index': 2
				// 			}
				// 		);
				// 		
				// 	toggleCaptions(true);
				// 	
				// 	break;
				// }
			}
			
			// carousel Progression
			function advance(direction) {
				
				function toggleLoop(direction) {
					if (opts.loop && direction === 'next') {
						currentArticle = 0;
					} else if (opts.loop && direction === 'prev') {
						currentArticle = lastArticle;
					} else {
						return;
					}
				}
				
				// toggleCaptions(false);
				
				switch (direction) {
					
				case 'next':
					if (currentArticle !== 0) {
						console.log('not');
						$(section).find('.stage .article:eq('+(currentArticle - 1)+')').appendTo('.stage', section);
					}
					currentArticle += 1;
					go(currentArticle);
					// if (currentArticle < lastArticle) {
					// 	currentArticle += 1;
					// 	go(currentArticle);
					// } else {
					// 	toggleLoop(direction);
					// 	go(currentArticle);
					// }
					break;
			
				case 'prev':
					if (currentArticle > 0) {
						currentArticle -= 1;
						go(currentArticle);
					} else {
						toggleLoop(direction);
						go(currentArticle);
					}
					break;
				
				// Default used for .controls .control
				default:
					go(currentArticle);
					break;
				}
				
				if (opts.controls[1] && !opts.loop) {
					if (currentSlide >= lastSlide) {
						toggleNextPrev('.next', true);
					} else {
						toggleNextPrev('.next', false);
					}
					
					if (currentSlide <= 0) {
						toggleNextPrev('.prev', true);
					} else {
						toggleNextPrev('.prev', false);
					}
				}
			}
			
			
			
			
			if (opts.autoplay !== 0) {
				carouselActive = true;
			} else {
				carouselActive = false;
			}
			
			function next() {
				advance('next');
			}
					    
			function prev() {
				advance('prev');
			}
			
					    function startcarousel() {
				if (carouselActive) {
					interval = window.setInterval(next, opts.autoplay);
				} 
					    }
			
			function stopcarousel() {
				window.clearInterval(interval);
			}
			
					    startcarousel();
			
			
			// Toggle cursor pointer
			function togglePointer(bol, obj) {
				
				bol = bol ? bol =  'pointer' : bol = 'text';
				
				$(obj)
					.css({
						'cursor': bol
					});
			}
			
			// Prevents control events from bubbling up
			$('.controls, .next, .prev, .caption', section)
				.bind(
					'click',
					function (e) {						
						e.stopPropagation();
					}
				);
			
			$(section)
				.bind(
					'click', 
					function () {
						if (opts.sectionEvent[0]) {
							advance('next');
						}
						if (opts.sectionEvent[1]) {
							carouselActive = false;
						}
					}
				).mouseover(function () {
					if (opts.sectionEvent[2]) {
						stopcarousel();
						$(this).addClass('hovering');
						// toggleCaptions(true);
					}
					
					if ($(section).hasClass('clickable')) {
						togglePointer(true, this);
					}
				}).mouseleave(function () {
					if (opts.sectionEvent[2]) {
						startcarousel();
						$(this).removeClass('hovering');
						// toggleCaptions(false);
					}
					
					if ($(section).hasClass('clickable')) {
						togglePointer(false, this);
					}
				});

			
			if (opts.controls) {
				
				// Events for control click/mouseover
				$('.controls .control', controlPanel)
					.bind(
						controlsEvent,
						function () {
							currentArticle = $(this).index();
							advance();
							if (opts.sectionEvent[1]) {
								carouselActive = false;
							}
						}
					);
					
				// Next and Prev click events
				$('.prev, .next', controlPanel)
					.click(
						function (params) {
							params = $(this).attr('class');
							advance(params);
							if (opts.sectionEvent[1]) {
								carouselActive = false;
							}
						}
					);
			}
			
			
			
			
			
		});
	};
	
	// carousel default options
	$.fn.carousel.defaults = {
		autoplay: 2000,  // Autoplay speed; Use 0 to disable autoplay
		// autoSizeSlides: true, // Adds inline css to slides that matches the height and width of the container
		aside: null, // Selector
		asideAnimation: false, // Can be set to 'fade', 'slide', or false(default)
		sectionEvent: [true, true, true], // [container click advances carousel, stop carousel when clicked, pauses carousel on hover]
		controls: false, // [controls, next/prev]
		controlEvent: true, // controls click/hover - true will require a control click to trigger control false will trigger on hover
		loop: true, // Allows for the carousel to cycle 
		articleSelector: null, // By default the carousel will transition all first level children, if you so desire you can pass a selector such as ".slide"
		// slideAnimation: false, // Can be set to 'fade'(default) or 'slide', anything other than fade or slide will default to fade
		animationSpeed: 300 // Animation speed for slide progression
	};

})(jQuery);







// (function ($) {
// 	
// 	'use strict';
// 	
// 	$.fn.carousel = function (options) {
// 
// 		return this.each(function () {
// 			
// 			// // carousel object 
// 			function Carousel(cont, opts) {
// 				this.container = cont;
// 				this.containerWidth = $(cont).width();
// 				this.containerHeight = $(cont).height();
// 				this.settings = $.extend({}, $.fn.carousel.defaults, opts);
// 				this.slides = this.settings.slideSelector ? $(this.settings.slideSelector, this.container) : $(this.container.children).splice(0, this.container.children.length);
// 				this.currentSlide = 0;
// 				this.slideCount = this.slides.length;
// 				this.lastSlide = this.slideCount - 1;
// 				this.controlPanel = null;
// 				this.captions = this.settings.captions ? $(this.settings.captions, this.container) : null;
// 			}
// 			
// 			// carousel property variable assignments
// 			var that = this,
// 				carousel = new Carousel(that, options),
// 				container = carousel.container,
// 				slides = carousel.slides,
// 				opts = carousel.settings,
// 				contWidth = carousel.containerWidth,
// 				contHeight = carousel.containerHeight,
// 				currentSlide = carousel.currentSlide,
// 				lastSlide = carousel.lastSlide,
// 				captions = carousel.captions,
// 				captionHeight = null,
// 				controlPanel = carousel.controlPanel,
// 				controlsEvent = opts.controlEvent ? 'click'  : 'mouseover',
// 				carouselActive = null,
// 				interval = null;
// 
// 			// Sets up slides for configured animation	
// 			switch (opts.slideAnimation) {
// 
// 			case 'slide':
// 				$(container)
// 					.wrapInner('<div class="window" style="overflow:hidden; width:' + contWidth + 'px; position:relative;"><div class="stage" style="position:relative; left:0; width:' + contWidth * (lastSlide + 1) + 'px;"></div></div>');
// 				if ($(slides).css('float') !== 'left') {
// 					$(slides)
// 						.css({
// 							'float': 'left',
// 							'position': 'relative'
// 						});
// 
// 					if (opts.autoSizeSlides) {
// 						$(slides)
// 							.css({
// 								'height': contHeight,
// 								'width': contWidth
// 							})
// 							.wrapInner('<div class="slide-content" />');
// 					}
// 				}
// 				
// 				break;
// 			
// 			case 'fade':
// 				if ($(slides).css('position') !== 'absolute') {
// 					$(slides)
// 						.css({
// 							'position': 'absolute',
// 							'top': 0,
// 							'left': 0,
// 							'opacity': 0
// 						});
// 
// 					if (opts.autoSizeSlides) {
// 						$(slides)
// 							.css({
// 								'height': contHeight,
// 								'width': contWidth
// 							})
// 							.wrapInner('<div class="slide-content" style="height:100%;" />');
// 					}
// 				}
// 
// 				break;
// 				
// 			default:
// 				if ($(slides).css('position') !== 'absolute') {
// 					$(slides)
// 						.css({
// 							'position': 'absolute',
// 							'top': 0,
// 							'left': 0
// 						});
// 
// 					if (opts.autoSizeSlides) {
// 						$(slides)
// 							.css({
// 								'height': contHeight,
// 								'width': contWidth
// 							})
// 							.wrapInner('<div class="slide-content" style="height:100%;" />');
// 					}
// 				}
// 
// 				break;
// 			}	
// 			
// 			$(slides).each(function () {
// 				if ($(this).index() !== 0) {
// 					$(this)
// 						.css({
// 							'z-index': 1
// 						});
// 				} else {
// 					$(this)
// 						.addClass('active')
// 						.css({
// 							'z-index': 2,
// 							'opacity': 1
// 						});
// 				}
// 			});
// 			
// 			if (captions) {
// 
// 				$(captions[0])
// 					.addClass('active');
// 					
// 				$(captions)
// 					.css({
// 						'position': 'absolute',
// 						'left': 0,
// 						'bottom': 0
// 					});
// 				
// 				// Sets up captions for configured animations
// 				switch (opts.captionAnimation) {
// 					
// 				case 'slide':
// 					$(slides)
// 						.css({
// 							'overflow': 'hidden'
// 						});
// 						
// 					captionHeight = parseInt($(captions).css('padding-top'), 0) * 2 + $(captions).height();
// 					
// 					$(captions)
// 						.css({
// 							'bottom': -captionHeight
// 						});
// 					break;			
// 							
// 				case 'fade':
// 					$(captions)
// 						.css({
// 							'opacity': 0
// 						});
// 					break;	
// 					
// 				default:
// 					$(captions)
// 						.css({
// 							'opacity': 1
// 						});
// 					break;
// 				}	
// 			}
// 
// 			// carousel method to add control panel and corresponding property
// 			Carousel.prototype.controls = function () {
// 				$(container)
// 					.append('<div class="control-panel" />');
// 					
// 				this.controlPanel = $('.control-panel', container);
// 			};
// 
// 			// Disables next/prev if loop is false and have reached the end of the carousel
// 			function toggleNextPrev(obj, bol) {
// 				if (bol) {
// 					$(obj, controlPanel).addClass('disabled');
// 				} else {
// 					$(obj, controlPanel).removeClass('disabled');
// 				}
// 			}
// 			
// 			// Builds control panel
// 			if (opts.controls) {
// 				
// 				carousel.controls();
//         
// 				controlPanel = carousel.controlPanel;
// 
// 				$(controlPanel)
// 					.css({
// 						'position': 'absolute',
// 						'top': 0,
// 						'left': 0,
// 						'height': contHeight,
// 						'width': contWidth
// 					});
// 				
// 				// Adds controls to control panel
// 				if (opts.controls[0]) {
// 					
// 					$(controlPanel)
// 						.append('<div class="controls-container"><ul class="controls"></ul></div>');
// 					
// 					$(slides).each(function (i) {
// 						$('.controls', container)
// 							.append('<li class="control"><span>' + i + '</span></li>');
// 					});
// 					
// 					$(controlPanel)
// 						.find('.controls .control:eq(0)')
// 						.addClass('active');
// 				}
// 				
// 				// Adds next and prev controls
// 				if (opts.controls[1]) {
// 					$(controlPanel)
// 						.append('<div class="prev-container"><span class="prev">Prev</span></div><div class="next-container"><span class="next">Next</span></div>');
// 						
// 					if (!opts.loop) {
// 						toggleNextPrev('.prev', true);
// 					}
// 				}
// 				
// 				// Needed for styling clickable containers if there are multiple instances of the carousel on one page
// 				if (opts.containerEvent[0]) {
// 					$(container)
// 						.addClass('clickable');
// 				}
// 			}
// 
// 			// Sets the carousel container to relative if currently static
// 			if ($(container).css('position') === 'static') {
// 				$(container)
// 					.css({
// 						'position': 'relative'
// 					});
// 			}
// 
// 			function toggleCaptions(bol) {
// 				function bolToggle(bol) {
// 					bol = bol ? bol = 0 : bol = -captionHeight;
// 				}
// 				
// 				if (captions) {
// 					switch (opts.captionAnimation) {
// 
// 					case 'slide':
// 						bolToggle(bol);
// 						$(captions)
// 							.each(
// 								function () {
// 									if ($(this).hasClass('active') && $(container).hasClass('hovering')) {
// 										$(this)
// 											.animate({
// 												'bottom': 0
// 											}, {
// 												duration: opts.speed
// 											});
// 									} else {
// 										$(this)
// 											.stop(true)
// 											.animate({
// 												'bottom': -captionHeight
// 											}, {
// 												duration: opts.speed
// 											});
// 									}
// 								}
// 							);
// 						break;
// 					case 'fade':
// 						bolToggle(bol);
// 						$(captions)
// 							.each(
// 								function () {
// 									if ($(this).hasClass('active') && $(container).hasClass('hovering')) {
// 										$(this)
// 											.animate({
// 												'opacity': 1
// 											}, {
// 												duration: opts.speed
// 											});
// 									} else {
// 										$(this)
// 											.stop(true)
// 											.animate({
// 												'opacity': 0
// 											}, {
// 												duration: opts.speed
// 											});
// 									}
// 								}
// 							);
// 						break;
// 					default:
// 						bolToggle(bol);
// 						$(captions)
// 							.each(
// 								function () {
// 									if ($(this).hasClass('active') && $(container).hasClass('hovering')) {
// 										$(this)
// 											.css({
// 												'opacity': 1
// 											});
// 									} else {
// 										$(this)
// 											.stop(true)
// 											.css({
// 												'opacity': 1
// 											});
// 									}
// 								}
// 							);
// 						break;
// 					}
// 				}	
// 			}
// 			
// 			// Animation and class progression
// 			function go(nextSlide) {
// 				
// 				switch (opts.slideAnimation) {
// 
// 				case 'slide':
// 					if (captions) {
// 						toggleCaptions(false);
// 						
// 						$(captions)
// 							.removeClass('active');
// 							
// 						$(captions[nextSlide])
// 							.addClass('active');
// 					}
// 					$('.active', controlPanel)
// 						.removeClass('active');
// 						
// 					$('.controls .control:eq(' + nextSlide + ')', controlPanel)
// 						.addClass('active');
// 						
// 					$(slides)
// 						.removeClass('active')
// 						.css({
// 							'z-index': 1
// 						});
// 						
// 					$(slides[nextSlide])
// 						.addClass('active')
// 						.css({
// 							'z-index': 2
// 						});
// 						
// 					$('.stage', container)
// 						.stop(true)
// 						.animate(
// 							{
// 								'left': -contWidth * currentSlide
// 							}, 
// 							{
// 								duration: opts.speed
// 							}, 
// 							toggleCaptions(true)
// 						);
// 					break;
// 				
// 				case 'fade':
// 					if (captions) {
// 						toggleCaptions(false);
// 						
// 						$(captions)
// 							.removeClass('active');
// 							
// 						$(captions[nextSlide])
// 							.addClass('active');
// 							
// 						toggleCaptions(true);	
// 					}
// 					
// 					$('.active', controlPanel)
// 						.removeClass('active');
// 						
// 					$('.controls .control:eq(' + nextSlide + ')', controlPanel)
// 						.addClass('active');
// 						
// 					$(slides)
// 						.removeClass('active')
// 						.css({
// 							'z-index': 1
// 						})
// 						.stop(true)
// 						.animate(
// 							{
// 								'opacity': 0
// 							}, 
// 							{
// 								duration: opts.speed
// 							}
// 						);
// 						
// 					$(slides[nextSlide])
// 						.addClass('active')
// 						.css({
// 							'z-index': 2
// 						})
// 						.stop(true)
// 						.animate(
// 							{
// 								'opacity': 1
// 							},
// 							{
// 								duration: opts.speed
// 							},
// 							toggleCaptions(true)
// 						);
// 					break;
// 				
// 				default:
// 					if (captions) {
// 						toggleCaptions(false);
// 						
// 						$(captions)
// 							.removeClass('active')
// 							.css({
// 								'opacity': 0,
// 								'z-index': 1
// 							});
// 							
// 						$(captions[nextSlide])
// 							.addClass('active')
// 							.css({
// 								'opacity': 1,
// 								'z-index': 2
// 							});
// 							
// 						toggleCaptions(true);	
// 					}
// 					
// 					$('.active', controlPanel)
// 						.removeClass('active');
// 						
// 					$('.controls .control:eq(' + nextSlide + ')', controlPanel)
// 						.addClass('active');
// 						
// 					$(slides)
// 						.removeClass('active')
// 						.css({
// 							'opacity': 0,
// 							'z-index': 1
// 						});
// 						
// 					$(slides[nextSlide])
// 						.addClass('active')
// 						.css(
// 							{
// 								'opacity': 1,
// 								'z-index': 2
// 							}
// 						);
// 						
// 					toggleCaptions(true);
// 					
// 					break;
// 				}
// 			}
// 			
// 			// carousel Progression
// 			function advance(direction) {
// 				
// 				function toggleLoop(direction) {
// 					if (opts.loop && direction === 'next') {
// 						currentSlide = 0;
// 					} else if (opts.loop && direction === 'prev') {
// 						currentSlide = lastSlide;
// 					} else {
// 						return;
// 					}
// 				}
// 				
// 				toggleCaptions(false);
// 				
// 				switch (direction) {
// 					
// 				case 'next':
// 					if (currentSlide < lastSlide) {
// 						currentSlide += 1;
// 						go(currentSlide);
// 					} else {
// 						toggleLoop(direction);
// 						go(currentSlide);
// 					}
// 					break;
// 			
// 				case 'prev':
// 					if (currentSlide > 0) {
// 						currentSlide -= 1;
// 						go(currentSlide);
// 					} else {
// 						toggleLoop(direction);
// 						go(currentSlide);
// 					}
// 					break;
// 				
// 				// Default used for .controls .control
// 				default:
// 					go(currentSlide);
// 					break;
// 				}
// 				
// 				if (opts.controls[1] && !opts.loop) {
// 					if (currentSlide >= lastSlide) {
// 						toggleNextPrev('.next', true);
// 					} else {
// 						toggleNextPrev('.next', false);
// 					}
// 					
// 					if (currentSlide <= 0) {
// 						toggleNextPrev('.prev', true);
// 					} else {
// 						toggleNextPrev('.prev', false);
// 					}
// 				}
// 			}
// 			
// 			if (opts.autoplay !== 0) {
// 				carouselActive = true;
// 			} else {
// 				carouselActive = false;
// 			}
// 
// 			function next() {
// 				advance('next');
// 			}
// 		    
// 			function prev() {
// 				advance('prev');
// 			}
// 
// 		    function startcarousel() {
// 				if (carouselActive) {
// 					interval = window.setInterval(next, opts.autoplay);
// 				} 
// 		    }
// 
// 			function stopcarousel() {
// 				window.clearInterval(interval);
// 			}
// 
// 		    startcarousel();
// 			
// 			
// 			// Toggle cursor pointer
// 			function togglePointer(bol, obj) {
// 				
// 				bol = bol ? bol =  'pointer' : bol = 'text';
// 				
// 				$(obj)
// 					.css({
// 						'cursor': bol
// 					});
// 			}
// 			
// 			// Prevents control events from bubbling up
// 			$('.controls, .next, .prev, .caption', container)
// 				.bind(
// 					'click',
// 					function (e) {						
// 						e.stopPropagation();
// 					}
// 				);
// 			
// 			$(container)
// 				.bind(
// 					'click', 
// 					function () {
// 						if (opts.containerEvent[0]) {
// 							advance('next');
// 						}
// 						if (opts.containerEvent[1]) {
// 							carouselActive = false;
// 						}
// 					}
// 				).mouseover(function () {
// 					if (opts.containerEvent[2]) {
// 						stopcarousel();
// 						$(this).addClass('hovering');
// 						toggleCaptions(true);
// 					}
// 					
// 					if ($(container).hasClass('clickable')) {
// 						togglePointer(true, this);
// 					}
// 				}).mouseleave(function () {
// 					if (opts.containerEvent[2]) {
// 						startcarousel();
// 						$(this).removeClass('hovering');
// 						toggleCaptions(false);
// 					}
// 					
// 					if ($(container).hasClass('clickable')) {
// 						togglePointer(false, this);
// 					}
// 				});
// 				
// 			
// 			
// 			// Events for control click/mouseover
// 			$('.controls .control', controlPanel)
// 				.bind(
// 					controlsEvent,
// 					function () {
// 						currentSlide = $(this).index();
// 						advance();
// 						if (opts.containerEvent[1]) {
// 							carouselActive = false;
// 						}
// 					}
// 				);
// 			
// 			// Next and Prev click events
// 			$('.prev, .next', controlPanel)
// 				.click(
// 					function (params) {
// 						params = $(this).attr('class');
// 						advance(params);
// 						if (opts.containerEvent[1]) {
// 							carouselActive = false;
// 						}
// 					}
// 				);
// 		});
// 	};
// 	
// 	// carousel default options
// 	$.fn.carousel.defaults = {
// 		autoplay: 2000,  // Autoplay speed; Use 0 to disable autoplay
// 		autoSizeSlides: true, // Adds inline css to slides that matches the height and width of the container
// 		captions: null, // Selector
// 		captionAnimation: false, // Can be set to 'fade', 'slide', or false(default)
// 		containerEvent: [true, true, true], // [container click advances carousel, stop carousel when clicked, pauses carousel on hover]
// 		controls: [true, false], // [controls, next/prev, clicking container advances carousel, controls hover/click]
// 		controlEvent: true, // controls click/hover - true will require a control click to trigger control false will trigger on hover
// 		loop: true, // Allows for the carousel to cycle 
// 		slideSelector: null, // By default the carousel will transition all first level children, if you so desire you can pass a selector such as ".slide"
// 		slideAnimation: false, // Can be set to 'fade'(default) or 'slide', anything other than fade or slide will default to fade
// 		speed: 300 // Animation speed for slide progression
// 	};
// 
// })(jQuery);