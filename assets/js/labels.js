var labelTemplate = Hogan.compile(
'<li data-list="label-{{id}}"><a href="#"><i class="icon-"></i> {{name}}</a></li>'
);

function addLabel(label) {
    if($('li[data-list=label-'+ label.label + ']').length > 0)
        return;
    
    $('#label-group')['append'](labelTemplate.render({
        name: label.pretty || label.label,
        id: label.label,
    }));
    
    $('li[data-list=label-' + label.label + ']').on('click.updatefilters', function() {
        toggleListItems(this.getAttribute('data-list'));
    });
}
