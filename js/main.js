(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		$.Scrollax();
	}

	var $backToTop = $('.back-to-top');
	$(window).on('scroll', function () {
		$backToTop.toggleClass('is-visible', $(this).scrollTop() > 600);
	});
	$backToTop.on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
		$('#main-content').attr('tabindex', '-1').trigger('focus');
	});



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"], a.btn[href^="#"], a.freelance-pill', function (event) {
			var $target = $($.attr(this, 'href'));
			if (!$target.length) return;
			event.preventDefault();

			var subject = $(this).data('subject');
			if (subject) {
				$('#subject').val(subject);
			}

			var scrollToTarget = function () {
				$('html, body').animate({ scrollTop: $target.offset().top - 70 }, 500);
			};

			// on mobile the open menu pushes the page down, so measure only after it has closed
			var $menu = $('#ftco-nav');
			if ($menu.hasClass('show')) {
				$menu.one('hidden.bs.collapse', scrollToTarget).collapse('hide');
			} else {
				scrollToTarget();
			}
		});

	};

	onePageClick();
	

	var carousel = function() {
		var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		$('.training-carousel').owlCarousel({
			loop: true,
			margin: 30,
			autoplay: !reduceMotion,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
			smartSpeed: 600,
			nav: true,
			dots: true,
			navText: ['<span aria-hidden="true">&#8249;</span>', '<span aria-hidden="true">&#8250;</span>'],
			// stagePadding sized per Bootstrap container width so each side peek shows ~25% of a card
			responsive: {
				0: { items: 1, stagePadding: 65, margin: 15 },
				450: { items: 1, stagePadding: 85, margin: 15 },
				576: { items: 1, stagePadding: 95, margin: 15 },
				768: { items: 2, stagePadding: 90 },
				992: { items: 3, stagePadding: 88 },
				1200: { items: 3, stagePadding: 100 }
			}
		});

		// the hero is a single static slide; owl is kept only because the template's hero CSS depends on its classes
		$('.home-slider').owlCarousel({
			items: 1,
			loop: false,
			autoplay: false,
			nav: false,
			dots: false,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

  $('#footer-year').text(new Date().getFullYear());

  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    var form = this;
    var $button = $(form).find('button[type="submit"]');
    var $status = $(form).find('.form-status');

    $button.prop('disabled', true).text('Sending...');
    $status.removeClass('is-success is-error').text('');

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.success) throw new Error(data.message);
        form.reset();
        $status.addClass('is-success').text("Thanks! Your message has been sent. I'll get back to you soon.");
      })
      .catch(function () {
        $status.addClass('is-error').text('Sorry, something went wrong. Please email me directly at shuvadeepghosh.bonki@gmail.com.');
      })
      .then(function () {
        $button.prop('disabled', false).text('Send Message');
      });
  });

})(jQuery);

