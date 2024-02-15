// Owlcarousel
$(document).ready(function(){
  $(".owl-courses").owlCarousel({
  	loop:true,
    margin:3,
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
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>"
  ],
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:4
      }
  }
});
  
var topItem = 0,
  leftItem = 0,
  popupHeight = 500;

$(".owl-carousel .owl-item").on("click", function(e) {
  var $this = $(this),
    $parent = $this.parents("#gallery"),
    content = $this.html(),
    $popup = $parent.find(".popup");

  topItem = $this.offset().top - $parent.offset().top + $this.height() / 2;
  leftItem = $this.offset().left - $parent.offset().left + $this.width() / 2;

  $popup.css({
    top: topItem,
    left: leftItem,
    width: 0,
    height: 0
  });

  $popup.html(content).stop().animate(
    {
      top: -((popupHeight - $this.parent().outerHeight()) / 2),
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 1
    },
    800
  );
});

$(".popup").on("click", function(e) {
  $(this).stop().animate(
    {
      width: 0,
      height: 0,
      top: topItem,
      left: leftItem,
      opacity: 0
    },
    400
  );
});


});