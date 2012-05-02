var headerTemplate = Hogan.compile(
'<div class="header">\n\
<div class="readlater"><div class="slider"></div><div class="label"></div></div>\n\
<div class="calendar"></div>\n\
<div class="headerToolbar"></div>\n\
</div>'
);

var t;
var timeoutTime=3000;
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
var date;
	
function showHeader(options) {
    $('#preview-panel')[0].innerHTML = headerTemplate.render(options);
    $('#preview-panel > .header > .readlater > .slider').slider({
        range: false,
        min: 0,
        max: 107,
        value: 0,
        animate: true,
        slide: function(event, ui) {
			
			if(ui.value>24){
				date=new Date((ui.value-23)*86400000+new Date().getTime());
			}else{
				date=new Date((ui.value)*3600000 +new Date().getTime())
			}
            $('#preview-panel > .header > .readlater > .label')['html'](getDelay(ui.value)+'  '+$.datepicker.formatDate('DD, d MM, yy',date));
			setReadLater(!ui.value);
			clearTimeout(t);
			showPopover();
			t=setTimeout('hidePopover()',timeoutTime);
        }
    });
	
	$('#preview-panel > .header > .readlater > div > a').hover(
		function () {
			clearTimeout(t);
			showPopover();
		}, 
		function () {
			clearTimeout(t);
			t=setTimeout('hidePopover()',timeoutTime);
		}
	);
    $('#preview-panel > .header > .readlater > .label')['html'](getDelay(0));
    
    $('#preview-panel > .header > .readlater > div > a').popover({
        placement: 'bottom',
        trigger: 'manual',
        title: 'Pick a date',
		content: function(){
			return '<input id="datefield" class="input uneditable-input"></input><div id="datepicker"></div>'
		}
    });
	if(getMessage(_active_item).read_later!==-1){
		date=getMessage(_active_item).read_later;
		setDelay();
	}else{
		date=new Date();
	}
	showHeaderToolbar();
}

function getDelay(val) {
    if(!val) return 'now';
    if(val <= 24) return val + ' hours';
    val = val - 24 /* remove the hours*/ + 1 /* we're already 1 day ahead */;
    if(val < 30) return val + ' days';
    val /= 7;
    return Math.floor(val) + ' weeks';
}

function setDelay(){
	var value;
	var currentDate=new Date();
	var diff = new Date();
	diff.setTime( date.getTime()-currentDate.getTime() );
	if(diff.getFullYear()>1970){
		value=107;
	}
	if(diff.getMonth()>=3){
		value=107;
	}
	if(diff.getMonth()===0){
		value=24-1+diff.getDate();
	}
	if(diff.getMonth()===1){
		value=24+31-1+diff.getDate();
		value
	}
	if(diff.getMonth()===2){
		value=24+31+28-1+diff.getDate();
	}
	$('#preview-panel > .header > .readlater > .slider').slider( "value" , [value] );
	$('#preview-panel > .header > .readlater > .label')['html'](getDelay(value)+'  '+$.datepicker.formatDate('DD, d MM, yy',date));
}

function showPopover(){
	 var value = $('#preview-panel > .header > .readlater > .slider').slider( "value" );
	 if(value<23){
		return;
	 }
	 datepickerOptions.defaultDate=value;
	 $('#preview-panel > .header > .readlater > div > a').popover('show');
	 $('#datepicker').datepicker(datepickerOptions);
	 $('#datepicker').datepicker( "setDate" , date )
	 $('.popover').hover(
		function () {
			clearTimeout(t);
		}, 
		function () {
			clearTimeout(t);	
			t=setTimeout('hidePopover()',timeoutTime);
		}
	);
}

function hidePopover(){
	$('#preview-panel > .header > .readlater > div > a').popover('hide');
}


function setReadLater(undo){
	var msg=getMessage(_active_item);
	if(!undo){
		msg.read_later=date;
		if(msg.location!='readlater'){
			setLocation(_active_item, 'readlater');
		}
	}else{
		msg.read_later=-1;
		setLocation(_active_item, 'inbox'); //check dit
	}
	
}