var photostrip = $('#photostrip');


function hoverExpand() {
	this.animate({ width: "+=10px" });
};

function moveRight() {
	if (photostrip.css("left") === "-1600px") {
		photostrip.animate({ left: 0 });
	} else {
		photostrip.animate({ left: "-=400" });
	}
};

function moveLeft() {
	if (photostrip.css("left") === "0px") {
		photostrip.animate({ left: "-1600px" });
	} else {
		photostrip.animate({ left: "+=400" });
	}
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
	});
	$('#button2').click(function(){
		photostrip.animate({ left: "-400px" });
	});
	$('#button3').click(function(){
		photostrip.animate({ left: "-800px" });
	});
	$('#button4').click(function(){
		photostrip.animate({ left: "-1200px" });
	});
	$('#button5').click(function(){
		photostrip.animate({ left: "-1600px" });
	});
});