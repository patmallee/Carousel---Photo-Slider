var photostrip = $('#photostrip');
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
	resetTimer();
};

function moveLeft() {
	if (photostrip.css("left") === "0px") {
		photostrip.animate({ left: "-1600px" });
	} else {
		photostrip.animate({ left: "+=400" });
	}
	resetTimer();
};

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
		resetTimer();
	});
	$('#button2').click(function(){
		photostrip.animate({ left: "-400px" });
		resetTimer();
	});
	$('#button3').click(function(){
		photostrip.animate({ left: "-800px" });
		resetTimer();
	});
	$('#button4').click(function(){
		photostrip.animate({ left: "-1200px" });
		resetTimer();
	});
	$('#button5').click(function(){
		photostrip.animate({ left: "-1600px" });
		resetTimer();
	});
});