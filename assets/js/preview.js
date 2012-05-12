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

var previewTemplate = Hogan.compile('\
<div id="preview">\n\
    <header>\n\
        <div id="rrlctn"></div>\n\
        <div>\n\
            <dl>\n\
                <dt>Labels</dt>\n\
                <dd id="rlabelsctn"></dd>\n\
            </dl>\n\
        </div>\n\
        <div id="rcontrolsctn"></div>\n\
    </header>\n\
    <div id="body">\n\
        <div id="text"></div>\n\
        <div id="replies"></div>\n\
    </div>\n\
</div>');
