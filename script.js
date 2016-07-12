var PHOTOSTRIP = $('#photostrip');
var FADESPEED = 300;
var STAGEWIDTH = 400;
var TIMERDURATION = 5000;

var timer = setInterval(changeSliderState, TIMERDURATION);
var currentPhotoID = 0;

function resetTimer() {
	clearInterval(timer);
	timer = setInterval(changeSliderState, TIMERDURATION);
}

function calculatePhotoID(input) {
	if (input === 'left') {

		if (currentPhotoID - 1 < 0) {
			return 4;
		} else {
			return (currentPhotoID - 1) % 5;
		}

	} else if (input === 'right' || input === undefined) {
	
		return (currentPhotoID + 1) % 5;
	
	} else {

		return input;
	
	}
}

function changeSliderState(input) {
	/* calculate ID of new photo to be displayed */
	var newPhotoID = calculatePhotoID(input);

	/* Update visual elements */
	PHOTOSTRIP.animate( {left: newPhotoID * -STAGEWIDTH} );
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
	preview.fadeIn(FADESPEED);
	preview.animate(
		{ top: "-=10" },
		{ duration: FADESPEED, queue: false }
	);
}

function fadeOutPreview(preview) {
	preview.fadeOut(FADESPEED);
	preview.animate(
		{ top: "+=10" },
		{ duration: FADESPEED, queue: false }
	);
}


$().ready(function() {
	$('#leftarrow').click( function() {
		fadeOutPreview( $('#leftpreview') );
		changeSliderState('left');
		setTimeout(function() {
			fadeInPreview( $('#leftpreview'), 'left' )
		}, FADESPEED);
	});

	$('#rightarrow').click( function() {
		fadeOutPreview( $('#rightpreview') );
		changeSliderState('right');
		setTimeout(function() {
			fadeInPreview( $('#rightpreview'), 'right' )
		}, FADESPEED);
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
		$('#rightpreview').fadeOut(FADESPEED);
		fadeOutPreview( $('#rightpreview') );
	});

	$('#quick-jump').click(function(e) {
		if ( e.target && e.target.matches("div.quick-button") ) {
			changeSliderState( parseInt(e.target.dataset.index) );
		}
	});
});
