var headerTemplate = Hogan.compile(
'<div class="header">\n\
<div class="readlater"><div class="slider"></div><div class="label"></div></div>\n\
<div class="calendar"></div>\n\
<div class="btn-toolbar" >\n\
	<div class="btn-group">\n\
		<a class="btn btn-primary" href="#"> Add Label</a>\n\
		<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"><span class="caret"></span></a>\n\
		<ul class="dropdown-menu"></ul>\n\
	</div>\n\
	<a class="btn btn-primary" href="#">\n\
	<i class="icon-folder-open icon-white"></i> Archive</a>\n\
	<a class="btn btn-primary" href="#">\n\
	<i class="icon-trash icon-white"></i> Delete</a>\n\
</div>\n\
</div>'
);

function showHeader(options) {
    $('#preview-panel')[0].innerHTML = headerTemplate.render(options);

    $('#preview-panel > .header > .readlater > .slider').slider({
        range: false,
        min: 0,
        max: 107,
        value: 0,
        animate: true,
        slide: function(event, ui) {
            $('#preview-panel > .header > .readlater > .label')['html'](getDelay(ui.value));
        }
    });
    $('#preview-panel > .header > .readlater > .label')['html'](getDelay(0));
    
    $('#preview-panel > .header > .readlater > a').popover({
        placement: 'bottom',
        trigger: 'manual',
        title: 'Pick a date'
    });
}

function getDelay(val) {
    if(!val) return 'now';
    if(val <= 24) return val + ' hours';
    val = val - 24 /* remove the hours*/ + 1 /* we're already 1 day ahead */;
    if(val < 30) return val + ' days';
    val /= 7;
    return Math.floor(val) + ' weeks';
}
