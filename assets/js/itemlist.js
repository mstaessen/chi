var listItemTemplate = Hogan.compile('\
<li {{^read}}class="unread"{{/read}} data-item-id="{{id}}">\n\
    <img class="avatar" src="https://graph.facebook.com/{{from.id}}/picture?type=square" alt="profile picture" />\n\
	<h4>{{short_from}}</h4>\n\
	<div class="preview">{{{short_content}}}</div>\n\
	<div class="labels">{{#labels}}<a data-label="label-{{label}}" class="label" href="#">{{label}}</a>{{/labels}}</div>\n\
	<a href="#" class="archive"><i class="icon-folder-open"></i></a>\n\
	<a href="#" class="trash"><i class="icon-trash"></i></a>\n\
</li>');

var _filter = false;
var _source_filter = false;
var _label_filter = false;

var _active_item = false;

function toggleListItems(name) {
    flag = name;
    if (name.match(/^source-.*/)) {
        flag = name.replace(/^source-/, '');
        console.log("toggling source flag " + flag);

        if (_source_filter == flag)
            _source_filter = false;
        else
            _source_filter = flag;
    } else if (name.match(/^label-.*/)) {
        flag = name.replace(/^label-/, '');
        console.log("toggling label flag " + flag);

        if (_label_filter == flag)
            _label_filter = false;
        else
            _label_filter = flag;
    } else {
        console.log("toggling flag " + flag);

        if (_filter == flag)
            _filter = false;
        else
            _filter = flag;
    }

    updateListItems();
}

function untoggleListItems() {
    if (_filter) {
        $('*> li[data-list="' + _filter + '"]').removeClass("active");
        _filter = false;
    }
    if (_source_filter) {
        $('*> li[data-list="source-' + _source_filter + '"]').removeClass(
                "active");
        _source_filter = false;
    }
    if (_label_filter) {
        $('*> li[data-list="label-' + _label_filter + '"]').removeClass(
                "active");
        _label_filter = false;
    }
}

function addDraggable() {
    $('#items-list > li').draggable({
        distance : 20,
        revert : true,
        opacity : 0.7,
        helper : 'clone',
        cursorAt : {
            top : 32,
            left : 0
        }
    });
}

var _context_msg = false;

function updateListItems() {
    console.log('updating list items');

    if (!_filter && !_source_filter && !_label_filter) {
        $('#items-list')['html']('');
        return;
    }
    var messages = getAllMessages();
    $('#items-list')['html'](messages.map(function(message) {
        if (_filter && message.location != _filter)
            return '';

        if (_source_filter && message.source != _source_filter)
            return '';

        if (!_label_filter)
            return listItemTemplate.render(message);

        labels = message.labels;
        for (i = 0; i < labels.length; i++) {
            if (labels[i].label == _label_filter)
                return listItemTemplate.render(message);
        }
        return '';
    }).join('\n'));
    addDraggable();
    if (_active_item) {
        $('#items-list > li[data-item-id=' + _active_item + ']').addClass('active');
        console.log('setting active item');
    }

    fn = function() {
        message = this.getAttribute('data-item-id');
        toggleMessage(message);
    }
    $('#items-list > li').on('click.previewmessage', fn);
    $('#items-list > li > a.more').on('click.previewmessage', fn);
    $('#items-list > li > .labels >.label').click(function(event) {
        event.stopPropagation();
        var label = this.getAttribute('data-label');
        untoggleListItems();
        $('* > li[data-list="' + label + '"]').addClass('active');
        toggleListItems(label);
    });
    $('#items-list > li > a.archive').click(function(event) {
        event.stopPropagation();
        var id = this.parentNode.getAttribute('data-item-id');
        archive(id);
    });
    $('#items-list > li > a.trash').click(function(event) {
        event.stopPropagation();
        var id = this.parentNode.getAttribute('data-item-id');
        trash(id);
    }); 
    $('#items-list > li').on('contextmenu', function(event) {
        _context_msg = this.getAttribute('data-item-id');
        
        $('#item_rightclick').css({left: event.pageX, top: event.pageY, zIndex: 101}).show();
			
		$('#item_rightclick > li.menuitem.addlabel,#item_labelmenu').hover(function() {
			var left=parseInt($(this).parent().css('left').replace(/px/, ''))+parseInt($(this).outerWidth());
			var top=parseInt($(this).parent().css('top').replace(/px/, ''))+parseInt($(this).position().top);
			$('#item_labelmenu').css({left: left, top: top, zIndex: 101}).show();
		}, function() {
			$('#item_labelmenu').hide();
		});
		
        $('<div id="overlay"></div>')
            .css({left : '0px', top : '0px',position: 'absolute', width: '100%', height: '100%', zIndex: '100' })
            .click(function() {
                $(this).remove();
                $('#item_rightclick').hide();
                _context_msg = false;
            })
            .on('contextmenu', function() { 
                $(this).remove();
                $('#item_rightclick').hide();
                _context_msg = false;
                return false;
            })
            .appendTo(document.body);
        return false;
    });

    if (updateToggleGroups)
        updateToggleGroups();
}

$(document).ready(function() {
    $('#items-panel').on('contextmenu', function() { return false; });

    $('#item_rightclick > li.menuitem.archive').on('click', function() {
        $('#item_rightclick').hide();
        $('#overlay').hide();
    
        if(!_context_msg) return;
        archive(_context_msg);
    });
    $('#item_rightclick > li.menuitem.trash').on('click', function() {
        $('#item_rightclick').hide();
        $('#overlay').hide();
    
        if(!_context_msg) return;
        trash(_context_msg);
    });
    $('#item_rightclick > li.menuitem.readlater').on('click', function() {
        $('#item_rightclick').hide();
        $('#overlay').hide();
        if(!_context_msg) return;
        showReadLaterModal(_context_msg);
    });
	$('#item_labelmenu')['append'](renderLabels());
	$('#item_labelmenu > li').on('click',function(event) {
		$('#item_labelmenu ').hide();
		$('#item_rightclick').hide();
        $('#overlay').hide();
		if(!_context_msg) return;
        if ($(this).hasClass("newlabel")) {
            $('#add_new_label').modal('show');
			$('#add_new_label').attr('data-mid',_context_msg);
            $('#add_new_label > .modal-body > input')
                .focus()
                .keypress(function(e) {
                    if(((typeof(e.which) == 'undefined') ? e.keyCode : e.which) != 13)
                        return true;
                    $('#add_new_label > .modal-footer > .btn-save').click();
                    return false;
                });
            $('.modal-backdrop').on('contextmenu', function() { return false; });
            return;
		}
		label = this.getAttribute('data-list');
		console.log('add label ' + label + ' to the message')
        addLabelToMessage(_context_msg, label.replace(/^label-/, ''));
        updateListItems();
	});
});
