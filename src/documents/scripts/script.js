// Comment
$("#holding").click(function(){
	console.log("works");
	$("#holding").pagify({
		pages: ['about'],
		default: 'about'
	});
});