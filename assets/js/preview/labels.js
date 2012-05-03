function preview_labels(message){
		$('#rlabelsctn').html(labelsTemplate.render());
		$('#preview-panel > .header > .headerToolbar > .btn-toolbar > .btn-group > .dropdown-menu')['append'](renderLabels());
		$('#preview-panel > .header > .headerToolbar > .btn-toolbar > .btn-group > .btn[data-btn-id=archive]').click(function(event){
			archive(_active_item);
		});
		$('#preview-panel > .header > .headerToolbar > .btn-toolbar > .btn-group > .btn[data-btn-id=trash]').click(function(event){
			trash(_active_item);
		});
		$('#preview-panel > .header > .headerToolbar > .btn-toolbar > .btn-group > .dropdown-menu > li').click(function(event){
			label=this.getAttribute('data-list');
			if(label.match("new-label")){
			    $('#add_new_label').modal('show');
				return;
			}
			console.log('add label '+label+' to the message')
			addLabelToMessage(_active_item,label.replace(/^label-/,''));
			updateListItems();
		});
}

// TODO just render labels and an add new label button.
var labelsTemplate = Hogan.compile(
'<div class="btn-toolbar" >\n\
	<div class="btn-group">\n\
		<a class="btn btn-primary" href="#"> Add Label</a>\n\
		<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"><span class="caret"></span></a>\n\
		<ul class="dropdown-menu">\n\
			<li data-list="new-label"><a href="#">New Label</a></li>\n\
			<li class="divider"></li>\n\
		</ul>\n\
	</div>\n\
	<div class="btn-group">\n\
	<a class="btn btn-primary" data-btn-id="archive" href="#">\n\
	<i class="icon-folder-open icon-white"></i> Archive</a>\n\
	</div>\n\
	<div class="btn-group">\n\
	<a class="btn btn-primary" data-btn-id="trash" href="#">\n\
	<i class="icon-trash icon-white"></i> Delete</a>\n\
	</div>\n\
</div>');