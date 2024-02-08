// Owlcarousel
$(document).ready(function(){
  $(".owl-courses").owlCarousel({
  	loop:true,
    margin:'',
    nav:true,
	autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    
   
    navText: [
	    "<i class='bi bi-chevron-left'></i>",
	    "<i class='bi bi-chevron-right'></i>"
	],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
  });


  $(".owl-gallery").owlCarousel({
loop:true,
  margin:0,
  nav:true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  merge:true,
  items:5,
  navText: [
      "<i class='bi bi-chevron-left'></i>",
      "<i class='bi bi-chevron-right'></i>"
  ],
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:5
      }
  }
});
  
});