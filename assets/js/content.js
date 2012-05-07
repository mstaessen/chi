var storage = new Storage();

function addMessage(message) {
    storage.addMessage(message);
    
    $(message.labels).each(function() {
        addLabel(this);
    });
}

function getMessage(id) { return storage.getMessage(id); }
function getAllMessages() { return storage.getAllMessages(); }
function saveMessage(message) { storage.saveMessage(message); }

$(document).ready(function() {
// ID 1
addMessage({
    short_from: 'Mystery Man',
    short_content: '<a href="http://www.lipsum.com/">Lorem ipsum</a> dolor sit amet, consectetur adipiscing elit. <a class="more" href="#">...</a>',
    source: 'facebook',
    from: 'Mystery Man',
    content: '<a href="http://www.lipsum.com/">Lorem ipsum</a> dolor sit amet, consectetur adipiscing elit. Aliquam neque nulla, rutrum cursus vehicula eget, malesuada in massa. Praesent a lectus vel velit porttitor pharetra ut id ipsum. Aliquam vitae dolor fringilla orci fermentum aliquam quis sit amet lacus. Praesent convallis convallis risus, eget viverra quam aliquet eu. Suspendisse potenti. Quisque vel lectus velit, quis pretium ligula. Integer enim sem, lobortis in pellentesque vitae, rutrum sed tortor.',
    likes: 2,
    comments: 3,
    location: 'inbox',
    read_later: -1,
    labels: [
        { label: 'facebook', pretty: 'Facebook' },
        { label: 'lipsum', pretty: 'Lipsum' }
    ]
});

// ID 2
addMessage({
    short_from: 'Bram Gotink',
    short_content: 'Ik vraag me af wat er op de mysterieuze slides staat...',
    source: 'twitter',
    from: 'Bram Gotink (<a href="http://twitter.com/bram_gotink" target="_blank">@bram_gotink</a>)',
    content: 'Ik vraag me af wat er op de mysterieuze slides staat... <a href="https://twitter.com/#!/search/%23chikul12" target="_blank">#chikul12</a>', 
    location: 'inbox',
    read_later: -1,
    labels: [
        { label: 'twitter', pretty: 'Twitter' },
        { label: 'chikul12'}
    ],
    reply: 3
});

// ID 3
addMessage({
    short_from: 'Michiel Staessen',
    short_content: '@bram_gotink ik ben ook benieuwd wat daar opstond... #chikul12',
    source: 'twitter',
    from: 'Michiel Staessen (<a href="http://twitter.com/mstaessen" target="_blank">@mstaessen</a>)',
    content: '<a href="http://twitter.com/bram_gotink" target="_blank">@bram_gotink</a> ik ben ook benieuws wat daar opstond... <a href="https://twitter.com/#!/search/%23chikul12" target="_blank">#chikul12</a>',
    location: 'archive',
    read_later: -1,
    labels: [
        { label: 'twitter', pretty: 'Twitter' },
        { label: 'chikul12' }
    ],
    reply_to: 2,
    read: true
});

});
