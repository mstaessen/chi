var labelTemplate = Hogan.compile(
'<li data-list="label-{{label}}"><a href="#"><i class="icon-"></i>{{#pretty}}{{pretty}}{{/pretty}}{{^pretty}}{{label}}{{/pretty}}</a></li>'
);



function addLabel(label) {
	var labels=storage.getLabels();
    for ( i = 0; i < labels.length; i++) {
        if (labels[i].label === label.label) {
            return;
        }
    }
	console.log('adding new label:'+ label.label);
	labels.push(label);
	storage.saveLabels(labels);
}

function renderLabels(){
	var labels=storage.getLabels();
	return labels.map(function(label) { 
			return labelTemplate.render(label);
	}).join('\n');
}

function addLabelToMessage(mid, labelName){
	var labels=storage.getLabels();
	console.log('adding ' +labelName+' to message '+mid);
	msg = getMessage(mid);
	for ( i = 0; i < msg.labels.length; i++) {
        if (msg.labels[i].label === labelName) {
            return;
        }
    }
	for ( i = 0; i < labels.length; i++) {
        if (labels[i].label === labelName) {
            msg.labels.push(labels[i]);
        }
    }
	saveMessage(msg);
	updateListItems();
	if(mid===_active_item){
		previewMessage(_active_item);
	}
}

function addNewLabel(mid,labelName){
	var label={label:' '};
	label.label=labelName;
	addLabel(label);
	addLabelToMessage(mid,labelName);
	updateListItems();
	previewMessage(_active_item);
	$('#label-group')['append'](labelTemplate.render(label));
	$('.toggle-group:not(.items-list) > li[data-list="label-'+labelName+'"]').on('click.updatefilters', function() {
            toggleListItems(this.getAttribute('data-list'));
  	  });
	$('#label-group > li[data-list="label-'+labelName+'"]').droppable({
			hoverClass: "ui-state-active",
			drop:function(event, ui){
				mid=ui.draggable.attr('data-item-id');
				label=this.getAttribute('data-list');
				addLabelToMessage(mid,label.replace(/^label-/,''));
			}
   	 });
   	 
	 $('#label-group > li[data-list="label-' + labelName + '"]').on('contextmenu', function() {
   	    untoggleListItems();
   	    $('* > li[data-list="' + this.getAttribute('data-list') + '"]').addClass('active');
   	    toggleListItems(this.getAttribute('data-list'));
   	 });
}

function removeLabelFromMessage(mid, labelName){
	console.log('removing ' +labelName+' to message '+mid);
	msg = getMessage(mid);
	for ( i = 0; i < msg.labels.length; i++) {
        if (msg.labels[i].label === labelName) {
            msg.labels.splice(i, 1);
        }
    }
	saveMessage(msg);
	updateListItems();
	if(mid===_active_item){
		previewMessage(_active_item);
	}
}

$(document).ready(function() {
    $('#labels-panel').on('contextmenu', function() { return false; });
    $('#labels-panel > ul > li').on('contextmenu', function() {
   	    untoggleListItems();
   	    $('* > li[data-list="' + this.getAttribute('data-list') + '"]').addClass('active');
   	    toggleListItems(this.getAttribute('data-list'));
   	 });
});

