function preview_read_later(message) {
	$('#rrlctn').html(readlaterTemplate.render({
		delay: getDelay(message.read_later)
	}));
	$('#rrlslider').slider({
		range : false,
		min : 0,
		max : 107,
		value : 0, // TODO set value from message.read_later
		animate : true,
		slide : function(event, ui) {
			updateSlider(event, ui);
		}
	});
	
	$("#rrlcalendar").datepicker({
		altField : "#datefield",
		altFormat : "DD, d MM, yy",
		minDate : 1,
		defaultDate : +1,
		onSelect : function(dateText, inst) {
			console.log(dateText + " selected");
			date = $('#rrlcalendar').datepicker("getDate");
			setDelay();
			setReadLater(false);
		}
	});
	
	$('#rrlctn').hover(function() {
		$('#rrlcontrols').show({
			effect: "blind"
		});
	}, function() {
		// TODO don't hide when the slider is still selected
		$('#rrlcontrols').hide({
			effect: "blind"
		});
	});
	
	if (getMessage(_active_item).read_later !== -1) {
		date = getMessage(_active_item).read_later;
		setDelay();
	} else {
		date = new Date();
	}
}

var t;
var timeoutTime = 3000;
var date;

function updateSlider(event, ui) {
	if (ui.value > 24) {
		date = new Date((ui.value - 23) * 86400000 + new Date().getTime());
	} else {
		date = new Date((ui.value) * 3600000 + new Date().getTime())
	}
	$('#rrllabel').html(createLabel(getDelay(ui.value), date));
	setReadLater(!ui.value);
	clearTimeout(t);
	showCalendar();
	t = setTimeout('hideCalendar()', timeoutTime);
}

function createLabel(delay, date) {
	return delay + '  ' + $.datepicker.formatDate('DD, d MM', date);
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

function showCalendar() {
	var value = $('#rrlslider').slider("value");
	if (value < 23) {
		return;
	}
	
	calendar = $("#rrlcalendar");
	if(calendar.css("display") == "none") {
		$("#rrlcalendar").show({
			effect: "blind"
		});
	}
}

function hideCalendar() {
	calendar = $("#rrlcalendar");
	if(calendar.css("display") != "none") {
		$("#rrlcalendar").hide({
			effect: "blind"
		});
	}
}

function setReadLater(undo) {
	msg = getMessage(_active_item);
	if (!undo) {
		msg.read_later = date;
		if (msg.location != 'readlater') {
			setLocation(_active_item, 'readlater');
		}
	} else {
		msg.read_later = -1;
		setLocation(_active_item, 'inbox'); // check dit
	}
}

var readlaterTemplate = Hogan.compile('<h6>&diams; Read Later &diams;</h6>\n\
<div id="rrlcontrols">\n\
\t<div class="rrllabelctn">\n\
\t\t<div id="rrllabel">{{delay}}</div>\n\
\t</div>\n\
\t<div class="rrlsliderctn">\n\
\t\t<div id="rrlslider"></div>\n\
\t</div>\n\
\t<div class="rrlcalendarctn">\n\
\t\t<div id="rrlcalendar"></div>\n\
\t</div>\n\
</div>');