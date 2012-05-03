var labelTemplate = Hogan.compile(
'<li data-list="label-{{label}}"><a href="#"><i class="icon-"></i>{{#pretty}}{{pretty}}{{/pretty}}{{^pretty}}{{label}}{{/pretty}}</a></li>'
);

var labels=[];

function addLabel(label) {
    for ( i = 0; i < labels.length; i++) {
        if (labels[i].label === label.label) {
            return;
        }
    }
	console.log('adding new label:'+ label.label);
	labels.push(label);
}

function renderLabels(){
	return labels.map(function(label) { 
			return labelTemplate.render(label);
	}).join('\n');
}

function addLabelToMessage(mid, labelName){
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
	$(".toggle-group:not(.items-list) > li[data-list=label-"+labelName+"]").on('click.updatefilters', function() {
            toggleListItems(this.getAttribute('data-list'));
    });
}
