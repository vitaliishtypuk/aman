(function( $ ) {



	function accordion (parent, question, answer) {
		$(parent).find($(answer).not('.show-answer')).hide();
		$(parent).find($(question)).on('click', function(e) {
			e.preventDefault();
			var thisLink = $(this);
			var thisParent = thisLink.parent();
			var thisHeight = thisLink.outerHeight();
			var openItemHeight = $(thisParent).prevAll('.item-opened').find($(answer)).outerHeight();

			console.log(openItemHeight);

			if($(thisParent).prevAll().hasClass('item-opened')) {
				$('html, body').animate({
					scrollTop: $(this).offset().top - openItemHeight - ($(window).height()/2 - thisHeight)
				}, 400);
			}
			$(parent).find($(question).not(thisLink)).parent().removeClass('item-opened');
			$(parent).find($(question).not(thisLink)).removeClass('opened');
			thisLink.parent().stop().toggleClass('item-opened');
			thisLink.stop().toggleClass('opened');
			$(parent).find($(answer)).not($(this).next()).slideUp(400).removeClass('show-answer');
			$(parent).find(thisLink).next().stop().slideToggle(400).toggleClass('show-answer');
			return false;
		});
	}





	/*document ready*/
	$(document).ready(function(){


		$('form input, form select, form textarea').focus(function() {
			$(this).parent('.filter__field').stop().addClass('focus');
		}).blur(function() {
			$(this).parent('.filter__field').stop().removeClass('focus');
		});


		if($('#sub__main').length) {
			$('.main__header').stop().addClass('sub');
		}



		/* ---------- header ---------- */

		$('.hamburger').on('click', function() {
			$(this).stop().toggleClass('show');
			$('.main__nav').stop().toggleClass('show');
			$('.main__header .main__menu li.menu-item-has-children').stop().removeClass('active');
			$('.main__header .main__menu li .sub-menu').stop().slideUp(400);
		});


		$('.main__nav_overlay').on('click', function() {
			$('.hamburger').stop().removeClass('show');
			$('.main__nav').stop().removeClass('show');

			$('.main__header .main__menu li.menu-item-has-children').stop().removeClass('active');
			$('.main__header .main__menu li .sub-menu').stop().slideUp(400);
		});


		$(window).on('scroll', function() {
			let st = $(this).scrollTop();
			if(st > 0) {
				$('.main__header').stop().addClass('sticky');
			}
			else {
				$('.main__header').stop().removeClass('sticky');
			}
		});


		if($(window).width() < 1200) {

			$('.main__header .main__menu li.menu-item-has-children > a').on('click', function(e) {
				e.preventDefault();
				$('.main__header .main__menu li.menu-item-has-children').not($(this).parent()).stop().removeClass('active');
				$(this).parent().stop().toggleClass('active');

				$('.main__header .main__menu li .sub-menu').stop().slideUp(400);
				$(this).parent().find('.sub-menu').stop().slideToggle(400);

			});
		}





		/* ---------- intro slider ---------- */

		// inititalize slider

		if($('.intro__slider').length) {

			$('.intro__slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: true,
				arrows: true,
				appendArrows: '.intro__slider_controls',
				dots: false,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 5000,
				prevArrow: '<button class="prev-slide"></button>',
				nextArrow: '<button class="next-slide"></button>'
			});

		}




		/* ---------- alphabet ---------- */


		function arr_diff (a1, a2) {
			var a = [], diff = [];
			for (var i = 0; i < a1.length; i++) {
				a[a1[i]] = true;
			}
			for (var i = 0; i < a2.length; i++) {
				if (a[a2[i]]) {
					delete a[a2[i]];
				} else {
					a[a2[i]] = true;
				}
			}
			for (var k in a) {
				diff.push(k);
			}
			return diff;
		}







		$(window).on('scroll', function() {
			let ast = $(this).scrollTop();
			let headerHeight = $('.main__header').outerHeight();

			if($('.alphabet__box').length) {
				let boxOffsetTop = $('.alphabet__box').offset().top;

				if(ast > boxOffsetTop - headerHeight) {
					$('.alphabet__box').stop().addClass('fix');
				}
				else {
					$('.alphabet__box').stop().removeClass('fix');
				}
			}

			

		});


		let targetLetters = [],
				srcLetters = [];

		$('.alphabet__result_title').each(function() {
			let targetLetter = $(this).text();

			targetLetters.push(targetLetter);

		});


		$('.alphabet__list li a').each(function() {
			let srcLetter = $(this).text();
			srcLetters.push(srcLetter);
		});

		
		let diff = arr_diff(srcLetters, targetLetters);

		diff.forEach(letter => {
			srcLetters.findIndex((item,index) => {
				if(letter == item) {
					$('.alphabet__list li')[index].classList.add('disabled');
				}
			});
		});


		$('.alphabet__list li a').on('click', function(e) {
			e.preventDefault();

			$('.alphabet__list li').stop().removeClass('active');

			$(this).parent().stop().addClass('active');

			let srcLetter = $(this).text();
			
			$('.alphabet__result_title').each(function() {
				let targetLetter = $(this).text();
				if(srcLetter == targetLetter) {
					console.log($('.alphabet__box_header').outerHeight());

					$('html, body').animate({
						scrollTop: $(this).parent().offset().top - ($('.alphabet__box_header').outerHeight() + 100),
					}, 700);
				}
			});
		});





		/* ---------- accordion ---------- */

		$('.accordion').each(function() {
			var $this = $(this);
			accordion($this, '.question', '.answer');
		});

		


	});











	/*window load*/
	$(window).on('load', function() {

	});




	






	/*window resize*/
	$(window).resize(function() {
		
	});




})(jQuery);	


	