function preview_controls(message){
		$('#rcontrolsctn').html(controlsTemplate.render());
		
		$('#preview .btn[data-btn-id=archive]').click(function(event){
			archive(_active_item);
		});
		$('#preview .btn[data-btn-id=trash]').click(function(event){
			trash(_active_item);
		});

}

// TODO just render labels and an add new label button.
var controlsTemplate = Hogan.compile(
'<div class="btn-toolbar" >\n\
	<div class="btn-group">\n\
		<a class="btn" data-btn-id="archive" href="#"><i class="icon-folder-open"></i> Archive</a>\n\
	</div>\n\
	<div class="btn-group">\n\
		<a class="btn" data-btn-id="trash" href="#"><i class="icon-trash"></i> Delete</a>\n\
	</div>\n\
</div>');
