function preview_text(message) {
	template = getTemplate(message.source);
	$('#text').html(template.render({
		text : message.content
	}));
}

function getTemplate(source) {
	switch (source) {
	case 'twitter':
		return twitterTemplate;
		break;
	case 'facebook':
		return facebookTemplate;
		break;
	case 'mail':
		return mailTemplate;
		break;
	case 'rss':
		return rssTemplate;
		break;
	default:
		return defaultTemplate;
		break;
	}
}

var twitterTemplate = Hogan.compile('{{{text}}}');
var facebookTemplate = Hogan.compile('{{{text}}}');
var mailTemplate = Hogan.compile('{{{text}}}');
var rssTemplate = Hogan.compile('{{{text}}}');
var defaultTemplate = Hogan.compile('{{{text}}}');