updateToggleGroups = function() {
    $(".toggle-group > li").off('click');
	$(".toggle-group > li").click(function() {
		// If the clicked item is active, make it inactive.
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
		} 
		// If the clicked item is not active...
		else {
			// ... make all siblings inactive and... 
			$(this).siblings().removeClass("active");
			// ... make this class active.
			$(this).addClass("active");
		}
	});
};

//$(document).ready(updateToggleGroups);
