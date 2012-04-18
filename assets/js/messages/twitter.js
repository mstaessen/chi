var twitterTemplate = Hogan.compile(
'<div class="twitter" id="message-{{id}}">\n\
    <img src="http://www.gravatar.com/avatar/?d=mm&s=72" alt="profile picture" />\n\
    <h4>{{{from}}}</h4>\n\
    <div class="message">{{{content}}}</div>\n\
    <div class="labels">{{#labels}}<a href="#" class="label" data-label="label-{{label}}">{{label}}</a>{{/labels}}</div><br style="clear: both" />\n\
    <div class="controls">\n\
        <a href="#" class="control reply" data-message-id="{{id}}">reply</a>\n\
        <a href="#" class="control retweet" data-message-id="{{id}}">retweet</a>\n\
        <a href="#" class="control quote" data-message-id="{{id}}">quote</a>\n\
        <a href="#" class="control favorite" data-message-id="{{id}}">favorite</a></div>\n\
</div>'
);

function showTwitterMsg(message) {
    html = twitter_handlePrevious(message);
    html += '\n';
    html += twitter_handleMessage(message);
    html += '\n';
    html += twitter_handleNext(message);
    
    $(html).insertAfter($('#preview-panel > .header'));
    
    $('#preview-panel > #message-' + message.id).addClass('active');
    
    $('#preview-panel > .twitter > .controls > .control.reply').on('click.reply', twitter_reply);
    $('#preview-panel > .twitter > .controls > .control.quote').on('click.quote', twitter_quote);
    $('#preview-panel > .twitter > .controls > .control.retweet').on('click.retweet', twitter_retweet);
    $('#preview-panel > .twitter > .controls > .control.favorite').on('click.favorite', twitter_favorite);
    
    $('#preview-panel > .twitter > .labels >.label').click(function(){
        label = this.getAttribute('data-label');
	toggleLabel(label);
    });
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
    contentNotAvailable();
}

function twitter_quote() {
    mid = this.getAttribute('data-message-id');
    console.log('quoting message ' + mid);

    // TODO
    contentNotAvailable();
}

function twitter_retweet() {
    mid = this.getAttribute('data-message-id');
    console.log('retweeting message ' + mid);

    // TODO
    contentNotAvailable();
}

function twitter_favorite() {
    mid = this.getAttribute('data-message-id');
    console.log('favoriting message ' + mid);

    // TODO
    contentNotAvailable();
}
