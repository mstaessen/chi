var previewTemplate = Hogan.compile('<div id="preview">\n\
\t<header></header>\n\
\t<div id="text"></div>\n\
\t<div id="replies"></div>\n\
</div>');


function previewMessage(mid){
	console.log('showing message ' + mid);
    message = getMessage(mid);
    _active_item = mid;
    
    // create the preview
    // append readlater
    $('#preview-panel').append(previewTemplate.render());
    header = $('#preview > header');
    header.append(preview_read_later(message));
    header.append(preview_labels(message));
    header.append(preview_controls(message));
    $('#text').append(preview_text(message));
    $('#replies').append(preview_replies(message));
}