jQuery.fn.liScroll = function (settings) {
  settings = jQuery.extend(
    {
      travelocity: 0.02
    },
    settings
  );
  return this.each(function () {
    var $strip = jQuery(this);
    $strip.addClass("newsticker");
    var stripHeight = 10;
    $strip.find("li").each(function (i) {
      stripHeight += jQuery(this, i).outerHeight(true); 
    });
    var $mask = $strip.wrap("<div class='mask'></div>");
    var $tickercontainer = $strip
      .parent()
      .wrap("<div class='tickercontainer'></div>");
    var containerHeight = $strip.parent().parent().height(); 
    $strip.height(stripHeight);
    var totalTravel = stripHeight;
    var defTiming = totalTravel / settings.travelocity; //
    function scrollnews(spazio, tempo) {
      $strip.animate({ top: "-=" + spazio }, tempo, "linear", function () {
        $strip.css("top", containerHeight);
        scrollnews(totalTravel, defTiming);
      });
    }
    scrollnews(totalTravel, defTiming);
    $strip.hover(
      function () {
        jQuery(this).stop();
      },
      function () {
        var offset = jQuery(this).offset();
        var residualSpace = offset.top + stripHeight;
        var residualTime = residualSpace / settings.travelocity;
        scrollnews(residualSpace, residualTime);
      }
    );
  });
};

$(function () {
  $("ul#news-alerts").liScroll();
});