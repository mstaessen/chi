function preview_text(message) {
	template = getTextTemplate(message.source);
	$('#text').html(template.render(message));
}

function getTextTemplate(source) {
	switch (source) {
	case 'twitter':
		return twitterTextTemplate;
		break;
	case 'facebook':
		return facebookTextTemplate;
		break;
	case 'mail':
		return mailTextTemplate;
		break;
	case 'rss':
		return rssTextTemplate;
		break;
	default:
		return defaultTextTemplate;
		break;
	}
}

var twitterTextTemplate = Hogan.compile('{{{text}}}');
var facebookTextTemplate = Hogan.compile(
'<h4>{{from.name}}</h4>\n\
<p>{{{content}}}</p>'
);
var mailTextTemplate = Hogan.compile('{{{text}}}');
var rssTextTemplate = Hogan.compile('{{{text}}}');
var defaultTextTemplate = Hogan.compile('{{{text}}}');