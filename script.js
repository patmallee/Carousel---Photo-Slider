var photostrip = $('#photostrip');
var currentPhotoID = 1;
var timer = setInterval(moveRight, 5000);

function hoverExpand() {
	this.animate({ width: "+=10px" });
};

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

$().ready(function() {
	$('#leftarrow').click(moveLeft);
	$('#rightarrow').click(moveRight);
	$('#leftarrow').hover(function() {
		$(this).toggleClass('hovered-arrow');
	});
	$('#rightarrow').hover(function() {
		$(this).toggleClass('hovered-arrow');
	});

	$('#button1').click(function(){
		photostrip.animate({ left: 0 });
		updateNavigation(1);
		resetTimer();
	});
	$('#button2').click(function(){
		photostrip.animate({ left: "-400px" });
		updateNavigation(2);
		resetTimer();
	});
	$('#button3').click(function(){
		photostrip.animate({ left: "-800px" });
		updateNavigation(3);
		resetTimer();
	});
	$('#button4').click(function(){
		photostrip.animate({ left: "-1200px" });
		updateNavigation(4);
		resetTimer();
	});
	$('#button5').click(function(){
		photostrip.animate({ left: "-1600px" });
		updateNavigation(5);
		resetTimer();
	});
});