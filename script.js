var photostrip = $('#photostrip');
var currentPhotoID = 1;
var timer = setInterval(changeSliderState, 5000);
var fadeSpeed = 300;

function resetTimer() {
	clearInterval(timer);
	timer = setInterval(changeSliderState, 5000);
}

function calculatePhotoID(input) {
	if (input === 'left') {

		if (currentPhotoID <= 1) {
			return 5;
		} else {
			return currentPhotoID - 1;
		}
	
	} else if (input === 'right' || input === undefined) {

		if (currentPhotoID >= 5) {
			return 1;
		} else {
			return currentPhotoID + 1;
		}
	
	} else {
		return input;
	}
}

function changeSliderState(input) {
	/* calculate ID of new photo to be displayed */
	var newPhotoID = calculatePhotoID(input);

	/* Update visual elements */
	photostrip.animate({ left: newPhotoID * -400 + 400});
	updateQuickNavButtons(newPhotoID);

	/* Update currentPhotoID for calculation purposes */
	currentPhotoID = newPhotoID;

	/* reset timer variable to prevent similarly-timed 
	clicks/auto-moves */
	resetTimer();
}

function updateQuickNavButtons(newPhotoID) {
	$('.selected-button').toggleClass('selected-button');
	$('#button' + newPhotoID).toggleClass('selected-button');
}

function fadeInPreview(preview, direction) {

	var previewID = calculatePhotoID(direction);
	var previewImage = $('#photo' + previewID).html();

	preview.html(previewImage)
	preview.fadeIn(fadeSpeed);
	preview.animate(
		{ top: "-=10" },
		{ duration: fadeSpeed, queue: false }
	);
}

function fadeOutPreview(preview) {
	preview.fadeOut(fadeSpeed);
	preview.animate(
		{ top: "+=10" },
		{ duration: fadeSpeed, queue: false }
	);
}

$().ready(function() {
	$('#leftarrow').click( function() {
		fadeOutPreview( $('#leftpreview') );
		changeSliderState('left');
		setTimeout(function() {
			fadeInPreview( $('#leftpreview'), 'left' )
		}, fadeSpeed);
	});

	$('#rightarrow').click( function() {
		fadeOutPreview( $('#rightpreview') );
		changeSliderState('right');
		setTimeout(function() {
			fadeInPreview( $('#rightpreview'), 'right' )
		}, fadeSpeed);
	});
	
	$('#leftarrow').hover(function() {
		$(this).toggleClass('hovered-arrow');
		fadeInPreview( $('#leftpreview'), 'left' );
	}, function() {
		$(this).toggleClass('hovered-arrow');
		fadeOutPreview( $('#leftpreview') );
	});

	$('#rightarrow').hover(function() {
		$(this).toggleClass('hovered-arrow');
		fadeInPreview( $('#rightpreview'), 'right' );
	}, function() {
		$(this).toggleClass('hovered-arrow');
		$('#rightpreview').fadeOut(fadeSpeed);
		fadeOutPreview( $('#rightpreview') );
	});

	$('#quick-jump').click(function(e) {
		if ( e.target && e.target.matches("div.quick-button") ) {
			changeSliderState( parseInt(e.target.dataset.index) );
		}
	});

});
