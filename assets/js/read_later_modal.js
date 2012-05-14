var datepickerOptionsModal={
	altField: "#datefieldmodal",
	altFormat: "DD, d MM, yy",
	minDate: 1,
	defaultDate: +1,
	onSelect: function(dateText, inst) { 
			console.log(dateText+" selected");
			dateModal=$('#datepicker').datepicker( "getDate");
			setDelayModalModal();
			setReadLaterModal(false);
	}
};
var midDatepickerModal;

function renderSliderModal(message){
	var mid=message.id;
	midDatepickerModal=mid;
	$('#rrlslidermodal').slider({
		range : false,
		min : 0,
		max : 107,
		value : 0,
		animate : true,
		slide : function(event, ui) {
			updateSliderModal(event, ui,mid);
		}
	});
	$('#rrlcontrolsmodal').show({
			effect: "blind"
	});
	
	
	$('#rrlslidermodal > a').hover(
		function () {
			clearTimeout(tModal);
			showPopoverModal();
		}, 
		function () {
			clearTimeout(tModal);
			tModal=setTimeout('hidePopoverModal()',timeoutTime);
		}
	);
	
	 $('#rrlslidermodal > a').popover({
        placement: 'bottom',		
        trigger: 'manual',
        title: 'Pick a date',
		content: function(){
			return '<input id="datefieldmodal" class="input uneditable-input"></input><div id="datepicker"></div>'
		}
	});
	
	if (message.read_later !== -1) {
		dateModal = new Date(message.read_later);
		setDelayModalModal();
	} else {
		dateModal = new Date();
	}
}

var tModal;
var dateModal;

function updateSliderModal(event, ui,mid) {
	if (ui.value > 24) {
		dateModal = new Date((ui.value - 23) * 86400000 + new Date().getTime());
	} else {
		dateModal = new Date((ui.value) * 3600000 + new Date().getTime())
	}
	$('#rrllabelmodal').html(createLabel(getDelay(ui.value), dateModal));
	setReadLaterModal(!ui.value,mid);
	clearTimeout(tModal);
	showPopoverModal();
	tModal=setTimeout('hidePopoverModal()',timeoutTime);
}



function setDelayModalModal() {
	var value;
	var currentDate = new Date();
	var diff = new Date();
	diff.setTime(dateModal.getTime() - currentDate.getTime());
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
	$('#rrlslidermodal').slider("value",	value);
	$('#rrllabelmodal').html(createLabel(getDelay(value), dateModal));
}


function showPopoverModal(){
	 var value = $('#rrlslidermodal').slider( "value" );
	 if(value<23){
		hidePopoverModal();
		return;
	 }
	 datepickerOptionsModal.defaultDate=value;
	 $('#rrlslidermodal > a').popover('show');
	 $('#datepicker').datepicker(datepickerOptionsModal);
	 $('#datepicker').datepicker( "setDate" , dateModal )
	 $('.popover').hover(
		function () {
			clearTimeout(tModal);
		}, 
		function () {
			clearTimeout(tModal);	
			tModal=setTimeout('hidePopoverModal()',timeoutTime);
		}
	);
	if(parseInt($('.popover').css("left"))>=screen.width-300){
	   $('.popover').css("left",screen.width-300);    
	 }
}

function hidePopoverModal(){
	$('#rrlslidermodal > a').popover('hide');
}

function setReadLaterModal(undo) {
	msg = getMessage(midDatepickerModal);
	if (!undo) {
		msg.read_later = dateModal;
		storage.saveMessage(msg);
		if (msg.location != 'readlater') {
			setLocation(midDatepickerModal, 'readlater');
		}
	} else {
		msg.read_later = -1;
		storage.saveMessage(msg);
		setLocation(midDatepickerModal, 'inbox');
	}
}

function showReadLaterModal(mid){
	$('#read_later').modal('show');
	var message=storage.getMessage(mid);
	$('#read_later > .modal-body')[0].innerHTML=readlaterModalTemplate.render({
		delay: getDelay(message.read_later)});
	renderSliderModal(message);
}

var readlaterModalTemplate = Hogan.compile(
'<h6>&diams; Read Later &diams;</h6>\n\
<div id="rrlcontrolsmodal" >\n\
	<div class="rrllabelmodalctn">\n\
		<div id="rrllabelmodal">{{delay}}</div>\n\
	</div>\n\
	<div class="rrlslidermodalctn">\n\
		<div id="rrlslidermodal"></div>\n\
	</div>\n\
</div>'
);
