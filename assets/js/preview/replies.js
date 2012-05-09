function preview_replies(message) {
    template = getRepliesTemplate(message.source);
    $('#replies').html(template.render(message));
}

function getRepliesTemplate(source) {
    switch (source) {
    case 'twitter':
        return twitterRepliesTemplate;
        break;
    case 'facebook':
        return facebookRepliesTemplate;
        break;
    case 'mail':
        return mailRepliesTemplate;
        break;
    case 'rss':
        return rssRepliesTemplate;
        break;
    default:
        return defaultRepliesTemplate;
        break;
    }
}

var twitterRepliesTemplate = Hogan.compile('{{{text}}}');
var facebookRepliesTemplate = Hogan.compile(
'{{#replies.data}}\n\
<div class="reply">\n\
    <h4>{{from.name}}</h4>\n\
    <p>{{{message}}}</p>\n\
</div>\n\
{{/replies.data}}\n\
<div class="more">{{replies.count}} comments in total, read all comments on <a href="{{{link}}}" target="new">Facebook</a></div>'
);
var mailRepliesTemplate = Hogan.compile('{{{text}}}');
var rssRepliesTemplate = Hogan.compile('{{{text}}}');
var defaultRepliesTemplate = Hogan.compile('{{{text}}}');