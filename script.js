var photostrip = $('#photostrip');
var currentPhotoID = 1;
var leftPreviewID = 5;
var rightPreviewID = 2;
var timer = setInterval(moveRight, 5000);
var fadeSpeed = 300;

function resetTimer() {
	clearInterval(timer);
	timer = setInterval(moveRight, 5000);
}

function moveRight() {
	if (photostrip.css("left") === "-1600px") {
		photostrip.animate({ left: 0 });
	} else {
		photostrip.animate({ left: "-=400" });
	}
	updateNavigation();
	resetTimer();
};

function moveLeft() {
	if (photostrip.css("left") === "0px") {
		photostrip.animate({ left: "-1600px" });
	} else {
		photostrip.animate({ left: "+=400" });
	}
	updateNavigation(-1);
	resetTimer();
};

function updateNavigation(newPhotoID) {
	if (typeof newPhotoID === 'undefined') {
		if (currentPhotoID >= 5) {
			newPhotoID = 1;
		} else {
			newPhotoID = currentPhotoID + 1;
		}
	} else if (newPhotoID === -1) {
		/* Negative 1 signifies that photostrip should move 1
		image in reverse order */
		if (currentPhotoID <= 1) {
			newPhotoID = 5;
		} else {
			newPhotoID = currentPhotoID - 1;
		}
	};

	$('#button' + currentPhotoID).toggleClass('selected-button');
	currentPhotoID = newPhotoID;
	$('#button' + currentPhotoID).toggleClass('selected-button');
}

function quickNav(navSelection) {
	photostrip.animate({ left: navSelection[0].dataset.position });
	updateNavigation( parseInt(navSelection[0].dataset.index) );
	resetTimer();
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
	$('#leftarrow').click(moveLeft);
	$('#rightarrow').click(moveRight);
	
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

	$('#button1').click(function(){
		quickNav( $(this) );
	});
	$('#button2').click(function(){
		quickNav( $(this) );
	});
	$('#button3').click(function(){
		quickNav( $(this) );
	});
	$('#button4').click(function(){
		quickNav( $(this) );
	});
	$('#button5').click(function(){
		quickNav( $(this) );
	});
});