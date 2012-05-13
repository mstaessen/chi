var newWindow;
var until = null;

function authenticate() {
	var appID = 201654839955521;
    var path = 'https://www.facebook.com/dialog/oauth?';
    var queryParams = ['client_id=' + appID,
     'redirect_uri=' + document.location.origin + document.location.pathname + '?',
	 'scope=read_stream',
     'response_type=token'];
   var query = queryParams.join('&');
   var url = path + query;
   newWindow=window.open(url,"_self");
}

function checkLogin(home) {
	if (home.error == null) {
		$("#btn_facebook").addClass("disabled");
	}
}

function requestFacebookMessages() {
	if (storage.getItem("facebookToken") != null) {
		if (until === null) {
			var d = new Date()
			until = "until=" + d.getTime();
		}
		var accessToken = storage.getItem("facebookToken");
		var path = "https://graph.facebook.com/me/home?";
		var queryParams = [ accessToken,
				"since=" + storage.getItem('facebookUpdateTime'), until,
				'callback=loadFacebookMessages' ];
		var query = queryParams.join('&');
		var url = path + query;
		var script = document.createElement('script');
		script.src = url;
		document.body.appendChild(script);
	} else {
		console.log("Not logged in on facebook");
	}
}

function loadFacebookMessages(data) {
	var messages = data.data;
	if (!messages || messages.length == 0) {
		var d = new Date()
		//storage.setItem('facebookUpdateTime', d.getTime())
		until = null;
		return;
	}
	for ( var i = 0; i < messages.length; i++) {
		addFacebookMessage(messages[i]);
		console.log("adding facebook message from" + messages[i].from.name);
	}
	until = data.paging.next.match(/until=\d\d\d\d\d\d\d\d\d\d/)[0];
	requestFacebookMessages();
}

function addFacebookMessage(msg) {
	var newMsg = {
		date : '', 
		short_from : '',
		short_content : '',
		source : 'facebook',
		from : null,
		content : '',
		link : '',
		location : 'inbox',
		read_later : -1,
		labels : [],
		replies : ''
	};
	if((new Date(msg.created_time)).getTime()>storage.getItem("facebookUpdateTime")){
		storage.setItem('facebookUpdateTime',new Date(msg.created_time)).getTime() )
	}
	newMsg.date = msg.created_time;
	newMsg.original = msg;
	newMsg.from = msg.from;
	newMsg.short_from = msg.from.name;
	if (msg.message != null) {
		newMsg.content = msg.message;
		newMsg.short_content = msg.message;
		newMsg.link = "https://facebook.com/" + msg.from.id + "/posts/" + msg.id.split('_')[1];
		newMsg.replies = msg.comments;
		addMessage(newMsg);
	}
}
