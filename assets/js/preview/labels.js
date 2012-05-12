function preview_labels(message) {
    $('#rlabelsctn').html(labelsTemplate.render(message));
    $('#rlabelsctn > ul > li.label').click(function(event){
        event.stopPropagation();
        var label = this.getAttribute('data-label');
        untoggleListItems();
        $('* > li[data-list=' + label + ']').addClass('active');
        toggleListItems(label);
    });
    $('#rlabelsctn > ul > li > .close').click(function(event) {
        event.stopPropagation();
        var label =  this.parentNode.getAttribute('data-label');
        removeLabelFromMessage(_active_item,label.replace(/^label-/,''));
    });
     $('#rlabelsctn .btn:first-child').click(function(event) {
        event.stopPropagation();
        $('#add_new_label').modal('show');
    });
	$('#rlabelsctn .dropdown-menu')['append'](renderLabels());
    $('#rlabelsctn .dropdown-menu > li').click(function(event) {
        label = this.getAttribute('data-list');
        if (label.match("new-label")) {
            $('#add_new_label').modal('show');
            return;
        }
        console.log('add label ' + label + ' to the message')
        addLabelToMessage(_active_item, label.replace(/^label-/, ''));
        updateListItems();
    });
}

// TODO just render labels and an add new label button.
var labelsTemplate = Hogan.compile('\
<ul>\n\
    <li data-label="{{location}}" class="label">{{location}}</li>\n<li data-label="source-{{source}}" class="label">{{source}}</li>\n\
	{{#labels}}\n\
	<li data-label="label-{{label}}" class="label">{{label}}&nbsp;<a href="#" class="close">&times;</a></li>\n\
	{{/labels}}\n\
    <li>\n\
        <div class="btn-group">\n\
            <a class="btn btn-mini" href="#"><i class="icon-tag"></i> Add Label</a>\n\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#"><span class="caret"></span></a>\n\
            <ul class="dropdown-menu">\n\
                <li data-list="new-label"><a href="#">New Label</a></li>\n\
                <li class="divider"></li>\n\
            </ul>\n\
        </div>\n\
    </li>\n\
</ul>');