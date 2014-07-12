$(document).ready(function() {
	var $window = $(window); // cache window
	var $video = $('video'); // cache video
	if ($window.width() < 631) {
		$video.replaceWith("<div id='mobile_image'>");
	} // end if statement
	
	$('.dash-bottom')
		.hide()
		.delay(8000)
		.fadeIn(3000);
	
	$('.overlay')
		.hide()
		.fadeIn(6000);
	
	$(function() {
			if ($window.width() < 631) { // up to breakpoint where #poem is still 900px height
				endZone = $('#poem').offset().top - $window.height() + 25; // calculate the height of the end zone.
			} else {
				endZone = $('#poem').offset().top - $window.height() + 500; // calculate the height of the end zone.
			} // end if/else statement
		$window.on('scroll', function() { // everytime user scrolls, trigger this anonymous function
			if ( (endZone) < $window.scrollTop() ) { 
				$window.off('scroll'); // tells JQuery to stop watching for user scrolling. Otherwise keeps firing the function below.
				$video.prop('muted', true); // mute the video but leave it looping above
				produce_stories(); // start making poem (function from poem.js)
			} // end if statement
		}); // end anonymous window.on function
	}); // end scroll triggers action function
	
	$("a.no_default").click(function(event) {
			event.preventDefault(); // prevents links of class "no_default" from behaving like links so that they may be used as even triggers for other actions (e.g., language change)
	}); // end preventDefault function
	
	$('a.people').on('click', function() {
		$('section#people').dialog({
			title: "People",
			height: 460,
			width: 320,
			show: {effect: "fadeIn", duration: 2000},
      hide: "fade"
		}); // end .dialog function
	}); // end a.people function
	
	$('a.code').on('click', function() {
		$('section#code').dialog({
			title: "Code",
			height: 450,
			width: 320,
			show: {effect: "fadeIn", duration: 2000},
      hide: "fade"
		}); // end .dialog function
	}); // end a.code function

}); // end document.ready