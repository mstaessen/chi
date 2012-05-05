function preview_labels(message){
		$('#rlabelsctn').html(labelsTemplate.render(message));
		
}

// TODO just render labels and an add new label button.
var labelsTemplate = Hogan.compile(
'<ul>\n\
	{{#labels}}\n\
	<li class="label">{{label}}&nbsp;<a href="#" class="close">&times;</a></li>\n\
	{{/labels}}\n\
	<li><a class="btn btn-mini" href="#"><i class="icon-tag"></i> Add Label</a></li>\n\
</ul>'
);