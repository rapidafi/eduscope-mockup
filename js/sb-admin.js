(function($) {
  "use strict"; // Start of use strict
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
})(jQuery); // End of use strict

// Credits: http://stackoverflow.com/a/979995
var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

// globally used variables (filters) from arguments (query string):
// TODO remove default values when overall system is ready for it
let EDUSCOPE_VERSION='201808';
let VERSIONS = ['201711','201712','201801','201802','201808'];
let qOrganization="02470"; // oppilaitosnumero, "02609"
let qYear=2016; // vuosi, 2016
let qOKM="1"; // OKM ohjauksen ala, "1"
let qMeasure="";
let qPredictYears=1;
let qGraphMin=null;
if (QueryString) {
  //console.debug(QueryString);
  if (QueryString.version) {
    if (VERSIONS.includes(QueryString.version)) {
      EDUSCOPE_VERSION=QueryString.version;
    }
  }
  if (QueryString.organization) {
    qOrganization=QueryString.organization;
  }
  if (QueryString.year) {
    qYear=QueryString.year;
  }
  if (QueryString.okm) {
    qOKM=QueryString.okm;
  }
  if (QueryString.measure) {
    qMeasure=QueryString.measure;
  }
  if (QueryString.predictyears) {
    qPredictYears=QueryString.predictyears;
  }
  if (QueryString.graphmin) {
    qGraphMin=QueryString.graphmin;
  }
}

$.getJSON("https://sa.rapida.fi/eduscope.php/koulutus_vuosi_korkeakoulu/organisaatio_koodi="+qOrganization+"?version="+EDUSCOPE_VERSION, function( data ) {
  $("#title_org").append(data[0].organisaatio_en);
});
$("#title_measure").append(qMeasure);

// pass arguments on:
$(document).ready(function () {
  $('a.nav-link').each(function(){
    var oldurl = $(this).attr('href');
    if(oldurl){//skip some unwanted, nb catenate starting with "&"
      $(this).attr('href',oldurl+"&version="+EDUSCOPE_VERSION+"&organization="+qOrganization+"&year="+qYear);
    }
  });
});
