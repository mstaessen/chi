function previewMessage(mid){
	console.log('showing message ' + mid);
    message = getMessage(mid);
    _active_item = mid;
    
    // create the preview
    // append readlater
    $('#preview-panel').append(previewTemplate.render());
    preview_read_later(message);
    preview_labels(message);
    preview_controls(message);
    preview_text(message);
    preview_replies(message);
}

var previewTemplate = Hogan.compile('<div id="preview">\n\
\t<header>\n\
\t\t<div id="rrlctn"></div>\n\
\t\t<div id="rlabelsctn"></div>\n\
\t\t<div id="rcontrolsctn"></div>\n\
\t</header>\n\
\t<div id="text"></div>\n\
\t<div id="replies"></div>\n\
</div>');
