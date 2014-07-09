$(document).ready(function() {
	$('.dash-bottom')
		.hide()
		.delay(8000)
		.fadeIn(3000);
	$('.overlay')
		.hide()
		.fadeIn(6000);
	$(function() {
		var $window = $(window); // cache window
		var $video = $('video'); // cache video
		var endZone = $('footer').offset().top - $window.height() - 100; // calculate the height of the end zone.

		$window.on('scroll', function() { // everytime user scrolls, trigger this anonymous function

			if ( (endZone) < $window.scrollTop() ) { 
				$window.off('scroll'); // tells JQuery to stop watching for user scrolling. Otherwise keeps firing the function below.
				$video.prop('muted', true); // mute the video but leave it looping above
				produce_stories(); // start making poem (function from poem.js)
			}
		}); // end anonymous $window.on function
	}); // end scroll triggers action function
}); // end document.ready