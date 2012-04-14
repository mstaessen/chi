var listItemTemplate = Hogan.compile(
'<li id="item-{{id}}" {{^read}}class="unread"{{/read}} data-item-id="{{id}}">\n\
    <img src="http://www.gravatar.com/avatar/?d=mm&s=48" alt="profile picture" />\n\
	<h4>{{short_from}}</h4>\n\
	<div class="preview">{{{short_content}}}</div>\n\
	<div class="labels">{{#labels}}<a class="label" href="#">{{label}}</a>{{/labels}}</div>\n\
</li>'
);

var twitterTemplate = Hogan.compile(
'<div class="twitter" id="message-{{id}}">\n\
    <img src="http://www.gravatar.com/avatar/?d=mm&s=72" alt="profile picture" />\n\
    <h4>{{{from}}}</h4>\n\
    <div class="message">{{{content}}}</div>\n\
    <div class="labels">{{#labels}}<a href="#" class="label">{{label}}</a>{{/labels}}</div><br style="clear: both" />\n\
    <div class="controls">\n\
        <a href="#" class="control reply" data-message-id="{{id}}">reply</a>\n\
        <a href="#" class="control retweet" data-message-id="{{id}}">retweet</a>\n\
        <a href="#" class="control quote" data-message-id="{{id}}">quote</a>\n\
        <a href="#" class="control favorite" data-message-id="{{id}}">favorite</a></div>\n\
</div>'
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
    
    $('#items-list > li').on('click.showmessage', function() {
        message = this.getAttribute('data-item-id');
        toggleMessage(message);       
    });
    $('#items-list > li > a.more').on('click.showmessage', function() {
        message = this.getAttribute('data-item-id');
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
    if (msg.read) return;
    
    console.log('marking ' + mid + ' as read');
    
    msg.read = true;
    $('#items-list > #item-' + mid).removeClass('unread');
}

function markUnread(mid) {
    msg = getMessage(mid);
    if (!msg.read) return;

    console.log('marking ' + mid + ' as unread');

    msg.read = false;
    $('#items-list > #item-' + mid).addClass('unread');
}

function hideMessage() {
    $('#preview-panel')[0].innerHTML = '';
}

function toggleMessage(mid) {
    hideMessage();
    if(_active_item == mid) {
        console.log('hiding message ' + mid);
        _active_item = false;
        return;
    }
    
    markRead(mid);
    console.log('showing message ' + mid);
    message = getMessage(mid);
    _active_item = mid;
    
    if (message.source == 'twitter') {
        showTwitterMsg(message);
    } else if (message.source == 'facebook') {
    
    } else if (message.source == 'email') {
    
    } else {
        contentNotAvailable();
    }
}

function showTwitterMsg(message) {
    html = twitter_handlePrevious(message);
    html += '\n';
    html += twitter_handleMessage(message);
    html += '\n';
    html += twitter_handleNext(message);
    
    $('#preview-panel')[0].innerHTML = html;
    $('#preview-panel > #message-' + message.id).addClass('active');
    
    $('#preview-panel > .twitter > .controls > .control.reply').on('click.reply', twitter_reply);
    $('#preview-panel > .twitter > .controls > .control.quote').on('click.quote', twitter_quote);
    $('#preview-panel > .twitter > .controls > .control.retweet').on('click.retweet', twitter_retweet);
    $('#preview-panel > .twitter > .controls > .control.favorite').on('click.favorite', twitter_favorite);
}

function twitter_handlePrevious(message) {
    if(!message.reply_to) return '';
    
    return twitter_handlePrevious(getMessage(message.reply_to))
            + '\n'
            + twitter_handleMessage(getMessage(message.reply_to));
}

function twitter_handleMessage(message) {
    return twitterTemplate.render(message);
}

function twitter_handleNext(message) {
    if(!message.reply) return '';
    return twitter_handleMessage(getMessage(message.reply)) 
            + '\n'
            + twitter_handleNext(getMessage(message.reply));
}

function twitter_reply() {
    mid = this.getAttribute('data-message-id');
    console.log('replying to message ' + mid);
    
    // TODO
}

function twitter_quote() {
    mid = this.getAttribute('data-message-id');
    console.log('quoting message ' + mid);

    // TODO
}

function twitter_retweet() {
    mid = this.getAttribute('data-message-id');
    console.log('retweeting message ' + mid);

    // TODO
}

function twitter_favorite() {
    mid = this.getAttribute('data-message-id');
    console.log('favoriting message ' + mid);

    // TODO
}
