var messages = [];

(function() {
    function saveMessage(message) { message.id = messages.push(message); message.short.id=message.id }

    var short_message = {
        from: 'Mystery Man',
        content: '<a href="http://www.lipsum.com/">Lorem ipsum</a> dolor sit amet, consectetur adipiscing elit. <a href="#">...</a>',
        labels: [
            { label: 'facebook' },
            { label: 'lipsum' }
        ]
    };
    var message = {
        short: short_message,
        source: 'facebook',
        from: 'Mystey Man',
        content: '<a href="http://www.lipsum.com/">Lorem ipsum</a> dolor sit amet, consectetur adipiscing elit. Aliquam neque nulla, rutrum cursus vehicula eget, malesuada in massa. Praesent a lectus vel velit porttitor pharetra ut id ipsum. Aliquam vitae dolor fringilla orci fermentum aliquam quis sit amet lacus. Praesent convallis convallis risus, eget viverra quam aliquet eu. Suspendisse potenti. Quisque vel lectus velit, quis pretium ligula. Integer enim sem, lobortis in pellentesque vitae, rutrum sed tortor.',
        likes: 2,
        comments: 3,
        location: 'inbox',
        read_later: 0,
        labels: [
            { label: 'facebook' },
            { label: 'lipsum' }
        ]
    }
    
    saveMessage(message);
    
    short_message = {
        from: 'Bram Gotink',
        content: 'Ik vraag me af wat er op de mysterieuze slides staat... #chikul12',
        labels: [
            { label: 'twitter' },
            { label: 'chikul12' }
        ]
    }
    message = {
        short: short_message,
        source: 'twitter',
        from: 'Bram Gotink (<a href="twitter.com/bram_gotink">@bram_gotink</a>)',
        content: 'Ik vraag me af wat er op de mysterieuze slides staat... #chikul12', 
        location: 'inbox',
        read_later: 0,
        labels: [
            { label: 'twitter' },
            { label: 'chikul12' }
        ]
    }
    
    saveMessage(message);
})();

function getMessage(id) { return messages[id - 1]; }

function getShortMessage(id) { return getMessage(id).short; }
