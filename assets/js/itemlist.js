var listItemTemplate = Hogan.compile('\
<li {{^read}}class="unread"{{/read}} data-item-id="{{id}}">\n\
    <img class="avatar" src="http://www.gravatar.com/avatar/?d=mm&s=48" alt="profile picture" />\n\
	<h4>{{short_from}}</h4>\n\
	<div class="preview">{{{short_content}}}</div>\n\
	<div class="labels">{{#labels}}<a data-label="label-{{label}}" class="label" href="#">{{label}}</a>{{/labels}}</div>\n\
	<a href="#" class="archive"><i class="icon-ok"></i></a>\n\
</li>');

var _filter = false;
var _source_filter = false;
var _label_filter = false;

var _active_item = false;

function toggleListItems(name) {
    flag = name;
    if (name.match(/^source-.*/)) {
        flag = name.replace(/^source-/, '');
        console.log("toggling source flag " + flag);

        if (_source_filter == flag)
            _source_filter = false;
        else
            _source_filter = flag;
    } else if (name.match(/^label-.*/)) {
        flag = name.replace(/^label-/, '');
        console.log("toggling label flag " + flag);

        if (_label_filter == flag)
            _label_filter = false;
        else
            _label_filter = flag;
    } else {
        console.log("toggling flag " + flag);

        if (_filter == flag)
            _filter = false;
        else
            _filter = flag;
    }

    updateListItems();
}

function untoggleListItems() {
    if (_filter) {
        $('*> li[data-list="' + _filter + '"]').removeClass("active");
        _filter = false;
    }
    if (_source_filter) {
        $('*> li[data-list="source-' + _source_filter + '"]').removeClass(
                "active");
        _source_filter = false;
    }
    if (_label_filter) {
        $('*> li[data-list="label-' + _label_filter + '"]').removeClass(
                "active");
        _label_filter = false;
    }
}

function addDraggable() {
    $('#items-list > li').draggable({
        distance : 20,
        revert : true,
        opacity : 0.7,
        helper : 'clone',
        cursorAt : {
            top : 32,
            left : 0
        }
    });
}

function updateListItems() {
    console.log('updating list items');

    if (!_filter && !_source_filter && !_label_filter) {
        $('#items-list')[0].innerHTML = '';
        return;
    }
    var messages = getAllMessages();
    $('#items-list')[0].innerHTML = messages.map(function(message) {
        if (_filter && message.location != _filter)
            return '';

        if (_source_filter && message.source != _source_filter)
            return '';

        if (!_label_filter)
            return listItemTemplate.render(message);

        labels = message.labels;
        for (i = 0; i < labels.length; i++) {
            if (labels[i].label == _label_filter)
                return listItemTemplate.render(message);
        }
        return '';
    }).join('\n');
    addDraggable();
    if (_active_item) {
        $('#items-list > li[data-item-id=' + _active_item + ']').addClass('active');
        console.log('setting active item');
    }

    fn = function() {
        message = this.getAttribute('data-item-id');
        toggleMessage(message);
    }
    $('#items-list > li').on('click.previewmessage', fn);
    $('#items-list > li > a.more').on('click.previewmessage', fn);
    $('#items-list > li > .labels >.label').click(function(event) {
        event.stopPropagation();
        var label = this.getAttribute('data-label');
        untoggleListItems();
        $('* > li[data-list="' + label + '"]').addClass('active');
        toggleListItems(label);
    });
    $('#items-list > li > a.archive').click(function(event) {
        event.stopPropagation();
        var id = this.parentNode.getAttribute('data-item-id');
        archive(id);
    });

    if (updateToggleGroups)
        updateToggleGroups();
}
