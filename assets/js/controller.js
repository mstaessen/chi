// TODO: add template for mails, tweets, ...

function contentNotAvailable() {
    $('#content_not_available').modal('show');
}


function setLocation(mid, location) {
	var msg=getMessage(mid);
    msg.location = location;
    saveMessage(msg);
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
    $('#items-list > li[data-item-id=' + mid + ']').removeClass('unread');
	saveMessage(msg);
}

function markUnread(mid) {
    msg = getMessage(mid);
    if (!msg.read) return;

    console.log('marking ' + mid + ' as unread');

    msg.read = false;
    $('#items-list > li[data-item-id=' + mid + ']').addClass('unread');
	saveMessage(msg);
}

function hideMessage() {
    $('#preview-panel').html('');
}

function toggleMessage(mid) {
    hideMessage();
    if(_active_item == mid) {
        console.log('hiding message ' + mid);
        _active_item = false;
        return;
    }
    
    markRead(mid);
    previewMessage(mid);
}




