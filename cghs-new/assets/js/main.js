(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
  
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(window).width() > 992) {
            if ($(this).scrollTop() > 45) {
                $('.sticky-top .container').addClass('shadow-sm').css('max-width', '100%');
            } else {
                $('.sticky-top .container').removeClass('shadow-sm').css('max-width', $('.topbar .container').width());
            }
        } else {
            $('.sticky-top .container').addClass('shadow-sm').css('max-width', '100%');
        }
    });


    // Hero Header carousel
    // $(".header-carousel").owlCarousel({
    //     items: 1,
    //     autoplay: true,
    //     smartSpeed: 500,
    //     center: false,
    //     dots: false,
    //     loop: true,
    //     margin: 0,
    //     nav : true,
    //     navText : [
    //         '<span class="material-symbols-outlined">chevron_left</span>',
    //         '<span class="material-symbols-outlined">chevron_right</span>'
    //     ]
    // });


    $(document).ready(function(){
        // Initialize WOW.js
        new WOW().init();
    
        // Initialize Owl Carousel
        var owl = $('.header-carousel');
        owl.owlCarousel({
          items: 1, // adjust number of items per slide
          loop: true,
          smartSpeed: 700,
          center: false,
          dots: false,
          autoplay: true,
          margin: 0,
        nav : true,
        navText : [
            '<span class="material-symbols-outlined">chevron_left</span>',
            '<span class="material-symbols-outlined">chevron_right</span>'
        ]
        });
    
        // Trigger WOW animations when the carousel changes
        owl.on('changed.owl.carousel', function(event) {
          // Trigger WOW.js to reset and run the animations
          new WOW().init();
        });
      });




 // Hero Header carousel
 $(".logo-carousel").owlCarousel({
    items: 7,
    autoplay: true,
    smartSpeed: 500,
    center: false,
    dots: true,
    loop: true,
    margin: 0,
    nav : true,
    navText : [
        '<span class="material-symbols-outlined">chevron_left</span>',
            '<span class="material-symbols-outlined">chevron_right</span>'
    ]
});


$(window).scroll(function () {
	console.log($(window).scrollTop())
	if ($(window).scrollTop() > 63) {
	  $('.main-menu').addClass('sticky');
	}
	if ($(window).scrollTop() < 64) {
	  $('.main-menu').removeClass('sticky');
	}
  });
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);



