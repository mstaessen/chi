var listItemTemplate = Hogan.compile(
'<li id="item-{{id}}" {{^read}}class="unread"{{/read}} data-item-id="{{id}}">\n\
    <img src="http://www.gravatar.com/avatar/?d=mm&s=48" alt="profile picture" />\n\
	<h4>{{short_from}}</h4>\n\
	<div class="preview">{{{short_content}}}</div>\n\
	<div class="labels">{{#labels}}<a class="label" href="#">{{label}}</a>{{/labels}}</div>\n\
</li>'
);

var _filter = false;
var _source_filter = false;
var _label_filter = false;

var _active_item = false;

function toggleListItems(name) {
    flag = name;
    if (name.match(/^source-.*/)) {
        flag = name.replace(/^source-/,'');
        console.log("toggling source flag " + flag);
        
        if (_source_filter == flag)
            _source_filter = false;
        else
            _source_filter = flag;
    } else if (name.match(/^label-.*/)) {
        flag = name.replace(/^label-/,'');
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

function updateListItems() {
    console.log('updating list items');

    if(!_filter && !_source_filter && !_label_filter) {
        $('#items-list')[0].innerHTML = '';
        return;
    }
    
    $('#items-list')[0].innerHTML = messages.map(function(message) {
        if (_filter && message.location != _filter)
            return '';

        if (_source_filter && message.source != _source_filter)
            return '';

        if (!_label_filter)
            return listItemTemplate.render(message);
        
        labels=message.labels;
        for(i = 0; i < labels.length; i++) {
            if(labels[i].label == _label_filter)
                return listItemTemplate.render(message);
        }
        return '';
    }).join('\n');
    
    if(_active_item) {
        $('#items-list > #item-' + _active_item).addClass('active');
    }
    
    fn = function() {
        message = this.getAttribute('data-item-id');
        toggleMessage(message);
    }
    
    $('#items-list > li').on('click.showmessage', fn);
    $('#items-list > li > a.more').on('click.showmessage', fn);
}
