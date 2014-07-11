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
				endZone = $('footer').offset().top - $window.height() - 355; // calculate the height of the end zone.
			} else {
				endZone = $('footer').offset().top - $window.height() - 10; // calculate the height of the end zone.
			} // end if/else statement
		$window.on('scroll', function() { // everytime user scrolls, trigger this anonymous function
			if ( (endZone) < $window.scrollTop() ) { 
				$window.off('scroll'); // tells JQuery to stop watching for user scrolling. Otherwise keeps firing the function below.
				$video.prop('muted', true); // mute the video but leave it looping above
				produce_stories(); // start making poem (function from poem.js)
			} // end if statement
		}); // end anonymous window.on function
	}); // end scroll triggers action function
}); // end document.ready