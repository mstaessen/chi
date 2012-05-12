
function Storage() {
    this.storage = localStorage;
    this.serializer = JSON;
    if (this.storage.getItem("numberOfMessages") == null) {
        this.storage.setItem("numberOfMessages", 0);
    }
    if (this.storage.getItem("labels") == null) {
        labels = [];
        this.storage.setItem("labels", this.serializer.stringify(labels));
    }
    if (this.storage.getItem("facebookUpdateTime") == null) {
        this.storage.setItem("facebookUpdateTime", 1075852800);
    }
}

Storage.prototype = {
    clear : function() {
        // Clear the storage container.
        this.storage.clear();
    },
    getNumberOfMessages : function() {
        return parseInt(this.storage.getItem("numberOfMessages"));
    },
    setNumberOfMessages : function(number) {
        this.storage.setItem("numberOfMessages", number);
    },
    hasMessage : function(id) {
        return (this.storage.getItem("message_" + id) != null);
    },
    getMessage : function(id) {
        var stringValue = this.storage.getItem("message_" + id);
        if (stringValue == null) {
            console.log("Message not found. id=" + id);
            return null;
        } else {
            return (this.serializer.parse(stringValue));
        }
    },
    addMessage : function(message) {
        var id = this.getNumberOfMessages() + 1;
        message.id = id;
        this.setNumberOfMessages(id);
        var key = "message_" + id;
        this.storage.setItem(key, this.serializer.stringify(message));
        console.log("Message added. id=" + id);
        return id;
    },
    getAllMessages : function() {
        var messages = [];
        var message;
        for (i = 1; i <= this.getNumberOfMessages(); i = i + 1) {
            message = getMessage(i);
            if (message != null) {
                messages.push(message);
            }
        }
        return messages;
    },
    saveMessage : function(message) {
        var key = "message_" + message.id;
        this.storage.setItem(key, this.serializer.stringify(message));
    },
    getLabels : function() {
        return this.serializer.parse(this.storage.getItem("labels"));
    },
    saveLabels : function(labels) {
        this.storage.setItem("labels", this.serializer.stringify(labels));
    },
    getItem : function(key) {
        return this.storage.getItem(key);
    },
    setItem : function(key, value) {
        this.storage.setItem(key, value);
    }
};

var storage = new Storage();