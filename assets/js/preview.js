function previewMessage(mid){
	console.log('showing message ' + mid);
    message = getMessage(mid);
    _active_item = mid;
    
    // create the preview
    // append readlater
    $('#preview-panel').html(previewTemplate.render());
    preview_read_later(message);
    preview_labels(message);
    preview_controls(message);
    preview_text(message);
    preview_replies(message);
}

$(document).ready(function() {
    $('#preview-panel').on('contextmenu', function(event) {
        event.stopPropagation();
        
        if(!_active_item) return false;
        
        $('#preview_rightclick').css({left: event.pageX, top: event.pageY, zIndex: 101}).show();
        
        $('<div id="overlay"></div>')
            .css({left : '0px', top : '0px',position: 'absolute', width: '100%', height: '100%', zIndex: '100' })
            .click(function() {
                $(this).remove();
                $('#preview_rightclick').hide();
            })
            .on('contextmenu', function() { 
                $(this).remove();
                $('#preview_rightclick').hide();
                return false;
            })
            .appendTo(document.body);
        return false;
    });

    $('#preview_rightclick > div.submenu > a.menuitem.archive').on('click', function() {
        $('#preview_rightclick').hide();
        $('#overlay').hide();
    
        if(!_active_item) return;
        archive(_active_item);
        previewMessage(_active_item);
    });
    $('#preview_rightclick > div.submenu > a.menuitem.trash').on('click', function() {
        $('#preview_rightclick').hide();
        $('#overlay').hide();
    
        if(!_active_item) return;
        trash(_active_item);
        previewMessage(_active_item);
    });
    $('#preview_rightclick > div.submenu > a.menuitem.readlater').on('click', function() {
        $('#preview_rightclick').hide();
        $('#overlay').hide();
    
        if(!_active_item) return;
        showReadLaterModal(_active_item);
        previewMessage(_active_item);
    });
});

var previewTemplate = Hogan.compile('\
<div id="preview">\n\
    <header>\n\
        <div id="rrlctn"></div>\n\
        <div id="rinfo">\n\
            <dl>\n\
                <dt>Labels</dt>\n\
                <dd id="rlabelsctn"></dd>\n\
            </dl>\n\
        </div>\n\
        <div class="clr"></div>\n\
    </header>\n\
    <div id="rcontrolsctn"></div>\n\
    <div id="body">\n\
        <div id="text"></div>\n\
        <div id="replies"></div>\n\
    </div>\n\
</div>');
