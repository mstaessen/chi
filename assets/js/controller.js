var listItemTemplate = Hogan.compile(
'<li id="message-{{id}}" {{^read}}class="unread"{{/read}} data-message-id="{{id}}">\n\
    <img src="http://www.gravatar.com/avatar/?d=mm&s=48" alt="profile picture" />\n\
	<h4>{{from}}</h4>\n\
	<div class="preview">{{{content}}}</div>\n\
	<div class="labels">{{#labels}}<a class="label" href="#">{{label}}</a>{{/labels}}</div>\n\
</li>'
);

// TODO: add template for mails, tweets, ...

function contentNotAvailable() {
    alert('this content is not available yet');
}

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
            return listItemTemplate.render(message.short);
        
        labels=message.labels;
        for(i = 0; i < labels.length; i++) {
            if(labels[i].label == _label_filter)
                return listItemTemplate.render(message.short);
        }
        return '';
    }).join('\n');
    
    if(_active_item) {
        $('#items-list > #message-' + _active_item).addClass('active');
    }
    
    $('#items-list > li').on('click.showmessage', function() {
        message = this.getAttribute('data-message-id');
        toggleMessage(message);       
    });
}

function setLocation(mid, location) {
    getMessage(mid).location = location;
    updateListItems();
}

function archive(mid) {
    console.log('archiving ' + mid);

    if (getMessage(mid).location == 'inbox')
        setLocation(mid, 'archive');
}

function trash(mid) {
    console.log('trashing ' + mid);
    
    setLocation(mid, 'trash');
}

function markRead(mid) {
    msg = getMessage(mid);
    if (msg.short.read) return;
    
    console.log('marking ' + mid + ' as read');
    
    msg.short.read = true;
    $('#items-list > #message-' + mid).removeClass('unread');
}

function markUnread(mid) {
    msg = getMessage(mid);
    if (!msg.short.read) return;

    console.log('marking ' + mid + ' as unread');

    getMessage(mid).short.read = false;
    $('#items-list > #message-' + mid).addClass('unread');
}

function toggleMessage(mid) {
    if(_active_item == mid) {
        console.log('hiding message ' + mid);
        _active_item = false;
        // TODO actually hide it
        return;
    }
    
    markRead(mid);
    console.log('showing message ' + mid);
    message = getMessage(mid);
    _active_item = mid;
    
    if (message.source == 'twitter') {
    
    } else if (message.source == 'facebook') {
    
    } else if (message.source == 'email') {
    
    } else {
        contentNotAvailable();
    }
}
