// Loader
document.body.onload = function() {
	$('.header').animate({opacity: '1'}, 'slow');

	setTimeout(function() {
		var preloader = document.getElementById('page_preloader');
		if (!preloader.classList.contains('done'))
			preloader.classList.add('done');
	}, 1000);
}
