var listItemTemplate = Hogan.compile(
'<li>\n\
    <img src="http://www.gravatar.com/avatar/?d=mm&s=48" alt="profile picture" />\n\
	<h4>{{from}}</h4>\n\
	<div class="preview">{{{content}}}</div>\n\
	<div class="labels">{{#labels}}<a class="label" href="#">{{label}}</a>{{/labels}}</div>\n\
</li>'
);

function setListItems(itemlist) {
    $('#items-list')[0].innerHTML = itemlist.map(function(item) {
        return listItemTemplate.render(item);
    }).join('\n');
    
}
