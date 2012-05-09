function preview_labels(message){
		$('#rlabelsctn').html(labelsTemplate.render(message));
		$('#rlabelsctn > ul > li').click(function(event){
			event.stopPropagation();
			var label = this.getAttribute('data-label');
			toggleLabel(label);
		});
		$('#rlabelsctn > ul > li > .close').click(function(event){
			event.stopPropagation();
			var label =  this.parentNode.getAttribute('data-label');
			removeLabelFromMessage(_active_item,label.replace(/^label-/,''));
		});
		$('#rlabelsctn > ul > li > .btn').click(function(event){
			event.stopPropagation();
			$('#add_new_label').modal('show');
		});
}

// TODO just render labels and an add new label button.
var labelsTemplate = Hogan.compile(		
'<ul>\n\
	{{#labels}}\n\
	<li data-label="label-{{label}}" class="label">{{label}}&nbsp;<a href="#" class="close">&times;</a></li>\n\
	{{/labels}}\n\
	<li><a class="btn btn-mini" href="#"><i class="icon-tag"></i> Add Label</a></li>\n\
</ul>'
);