var headerTemplate = Hogan.compile(
'<div class="header">\n\
<div class="readlater"></div>\n\
</div>'
);

function showHeader(options) {
    $('#preview-panel')[0].innerHTML = headerTemplate.render(options);

    $('#preview-panel > .header > .readlater').slider({
        range: false,
        min: 0,
        max: 100,
        value: 0,
        animate: true
    });
}
