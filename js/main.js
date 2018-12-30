;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};


	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};


	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#auro-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#auro-home').prepend($clone);

		// click the burger
		$('.js-auro-nav-toggle').on('click', function(){

			if ( $('body').hasClass('auro-offcanvas') ) {
				$('body').removeClass('auro-offcanvas');
			} else {
				$('body').addClass('auro-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('auro-offcanvas') ) {
					$('body').removeClass('auro-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-auro-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('auro-offcanvas') ) {
				$('body').removeClass('auro-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	};

	// Set the date we're counting down to
	var countDownDate = new Date("January 25, 2019 18:00:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function() {

	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now an the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in an element with id="demo"
	// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
	// + minutes + "Minutes " + seconds + "Seconds ";

	// Display the result in an element with id="demo"
	document.getElementById("days").innerHTML = days +" <small>days</small>";
	document.getElementById("hours").innerHTML = hours + " <small>hours</small> ";
	document.getElementById("minutes").innerHTML = minutes + " <small>minutes</small> ";
	document.getElementById("seconds").innerHTML = seconds + " <small>seconds</small> ";

	// If the count down is finished, write some text 
	if (distance < 0) {
	 clearInterval(x);
	 document.getElementById("demo").innerHTML = "The Wedding Ceremony is Over";
	}
	}, 1000);

	// Document on load.

	$(function(){
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
	});


}());

$(document).on('click','ul.headNav li',function(e){
	$('ul.headNav li').removeClass('active');
	$(this).addClass('active');

   // prevent default anchor click behavior
   e.preventDefault();
   var locate = $(this).attr("data-targets");
   var scrollT=$("#" + locate).offset().top -60;
   // animate
   $('html, body').animate({
       scrollTop: scrollT
     }, 600, function(){
     });
});
$(document).on('click','.auro-nav-toggle',function(){
	$(".headNav").addClass("in");
	$(this).addClass("active");
	$("body").css("overflow","hidden");
	});
$(document).on('click','.auro-nav-toggle.active,ul.headNav li',function(){
	$(".headNav").removeClass("in");
	$(".auro-nav-toggle").removeClass("active");
	$("body").css("overflow","auto");
	});
function onScroll(event){
var scrollPos = $(document).scrollTop();
    var lastScrolpos=$("#auro-started").position().top;
  if(scrollPos >= lastScrolpos){$(".moveDown").hide();}
    
 $(".moveDown").removeClass("in"); 
    
	$("ul.headNav li").each(function () {
	 var currLink = $(this);
	 var refElement = $("#" + currLink.attr("data-targets"));
	 if (refElement.position().top < scrollPos +85) {
        $('ul.headNav li').removeClass("active");
        currLink.addClass("active");
		
    }
    else{
        currLink.removeClass("active");
    }
	
	});
}
$(document).ready(function () {
   $(document).on("scroll", onScroll);
   setTimeout (function(){
	  $(".moveDown").addClass("in"); 
	    },5000);
});

