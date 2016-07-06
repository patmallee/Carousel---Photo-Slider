var photostrip = $('#photostrip');
var currentPhotoID = 1;
var leftPreviewID = 5;
var rightPreviewID = 2;
var timer = setInterval(changeSliderState, 5000);
var fadeSpeed = 300;

function resetTimer() {
	clearInterval(timer);
	timer = setInterval(changeSliderState, 5000);
}

function changeSliderState(input) {

	/* calculate ID of new photo to be displayed */
	if (input === 'left') {
		
		if (currentPhotoID <= 1) {
			var newPhotoID = 5;
		} else {
			var newPhotoID = currentPhotoID - 1;
		}
	
	} else if (input === 'right' || input === undefined) {

		if (currentPhotoID >= 5) {
			var newPhotoID = 1;
		} else {
			var newPhotoID = currentPhotoID + 1;
		}
	
	} else {
		var newPhotoID = input;
	}

	/* Update visual elements */
	photostrip.animate({ left: newPhotoID * -400 + 400});
	updateQuickNavButtons(newPhotoID);

	/* reset timer variable to prevent similarly-timed 
	clicks/auto-moves */
	resetTimer();
}

function updateQuickNavButtons(newPhotoID) {
	$('#button' + currentPhotoID).toggleClass('selected-button');
	currentPhotoID = newPhotoID;
	$('#button' + currentPhotoID).toggleClass('selected-button');
}

function fadeInPreview(preview, direction) {

	var previewID = currentPhotoID;

	if (direction === 'left') {
		if (currentPhotoID <= 1) {
			previewID = 5;
		} else {
			previewID -= 1
		}
	} else if (direction === 'right') {
		if (currentPhotoID >= 5) {
			previewID = 1;
		} else {
			previewID += 1;
		}

	}

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
		}, 400);
	});

	$('#rightarrow').click( function() {
		fadeOutPreview( $('#rightpreview') );
		changeSliderState('right');
		setTimeout(function() {
			fadeInPreview( $('#rightpreview'), 'right' )
		}, 400);
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
			changeSliderState( e.target.dataset.index );
		}
	});

});
