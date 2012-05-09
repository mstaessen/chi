var datepickerOptions={
	altField: "#datefield",
	altFormat: "DD, d MM, yy",
	minDate: 1,
	defaultDate: +1,
	onSelect: function(dateText, inst) { 
			console.log(dateText+" selected");
			date=$('#datepicker').datepicker( "getDate");
			setDelay();
			setReadLater(false);
	}
};

function preview_read_later(message) {
	$('#rrlctn').html(readlaterTemplate.render({
		delay: getDelay(message.read_later)
	}));
	renderSlider(message);

}

function renderSlider(message){
	var mid=message.id;
	$('#rrlslider').slider({
		range : false,
		min : 0,
		max : 107,
		value : 0,
		animate : true,
		slide : function(event, ui) {
			updateSlider(event, ui,mid);
		}
	});
	$('#rrlcontrols').attr('data-autohide',"on");
	$('#rrlctn').hover(function() {
		if($('#rrlcontrols').css("display")=="none"){
		  $('#rrlcontrols').show({
			effect: "blind"
		  });
		}
		clearTimeout(t2);
	}, function() {
		clearTimeout(t2);
		t2=setTimeout('hideRRLControls()',timeoutTime);
	});
	
	
	$('#rrlslider > a').hover(
		function () {
			clearTimeout(t);
			showPopover();
		}, 
		function () {
			clearTimeout(t);
			t=setTimeout('hidePopover()',timeoutTime);
		}
	);
	
	 $('#rrlslider > a').popover({
        placement: 'bottom',		
        trigger: 'manual',
        title: 'Pick a date',
		content: function(){
			return '<input id="datefield" class="input uneditable-input"></input><div id="datepicker"></div>'
		}
	});
	
	if (message.read_later !== -1) {
		date = new Date(message.read_later);
		setDelay();
	} else {
		date = new Date();
	}
}

var t;
var t2;
var timeoutTime = 3000;
var date;

function updateSlider(event, ui,mid) {
	if (ui.value > 24) {
		date = new Date((ui.value - 23) * 86400000 + new Date().getTime());
	} else {
		date = new Date((ui.value) * 3600000 + new Date().getTime())
	}
	$('#rrllabel').html(createLabel(getDelay(ui.value), date));
	setReadLater(!ui.value,mid);
	clearTimeout(t);
	showPopover();
	t=setTimeout('hidePopover()',timeoutTime);
}

function createLabel(delay, date) {
	return delay + '  ' + $.datepicker.formatDate('D, d MM', date);
}

function getDelay(val) {
	if (val <= 0)
		return 'now';
	if (val <= 24)
		return val + ' hours';
	val = val - 24 /* remove the hours */+ 1 /* we're already 1 day ahead */;
	if (val < 30)
		return val + ' days';
	val /= 7;
	return Math.floor(val) + ' weeks';
}

function setDelay() {
	var value;
	var currentDate = new Date();
	var diff = new Date();
	diff.setTime(date.getTime() - currentDate.getTime());
	if (diff.getFullYear() > 1970) {
		value = 107;
	}
	if (diff.getMonth() >= 3) {
		value = 107;
	}
	if (diff.getMonth() === 0) {
		value = 24 - 1 + diff.getDate();
	}
	if (diff.getMonth() === 1) {
		value = 24 + 31 - 1 + diff.getDate();
	}
	if (diff.getMonth() === 2) {
		value = 24 + 31 + 28 - 1 + diff.getDate();
	}
	$('#rrlslider').slider("value",	value);
	$('#rrllabel').html(createLabel(getDelay(value), date));
}


function showPopover(){
	 var value = $('#rrlslider').slider( "value" );
	 if(value<23){
		hidePopover();
		return;
	 }
	 datepickerOptions.defaultDate=value;
	 $('#rrlslider > a').popover('show');
	 $('#datepicker').datepicker(datepickerOptions);
	 $('#datepicker').datepicker( "setDate" , date )
	 $('.popover').hover(
		function () {
			clearTimeout(t2);
			clearTimeout(t);
		}, 
		function () {
			clearTimeout(t);	
			t=setTimeout('hidePopover()',timeoutTime);
			clearTimeout(t2);
			t2=setTimeout('hideRRLControls()',timeoutTime);
		}
	);
	if(parseInt($('.popover').css("left"))>=screen.width-300){
	   $('.popover').css("left",screen.width-300);    
	 }
}

function hidePopover(){
	$('#rrlslider > a').popover('hide');
}

function hideRRLControls(){
	$('#rrlcontrols').hide({
		effect: "blind"
	}); 
}

function setReadLater(undo,mid) {
	msg = getMessage(mid);
	if (!undo) {
		msg.read_later = date;
		storage.saveMessage(msg);
		if (msg.location != 'readlater') {
			setLocation(mid, 'readlater');
		}
	} else {
		msg.read_later = -1;
		storage.saveMessage(msg);
		setLocation(mid, 'inbox'); // check dit
	}
}

var readlaterTemplate = Hogan.compile(
'<h6>&diams; Read Later &diams;</h6>\n\
<div id="rrlcontrols">\n\
	<div class="rrllabelctn">\n\
		<div id="rrllabel">{{delay}}</div>\n\
	</div>\n\
	<div class="rrlsliderctn">\n\
		<div id="rrlslider"></div>\n\
	</div>\n\
</div>'
);
