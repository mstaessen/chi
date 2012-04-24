// TODO: add template for mails, tweets, ...

function contentNotAvailable() {
    $('#content_not_available').modal('show');
}

function addLabel(mid, label){

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
    
    showHeader({});
    
    if (message.source == 'twitter') {
        showTwitterMsg(message);
    } else if (message.source == 'facebook') {
    
    } else if (message.source == 'email') {
    
    } else {
        contentNotAvailable();
    }
}
