/* 
 * sort_function:
 * sort_function(a,b) > 0 if a comes before b
 */
function SortedList(sort_function) {
    this.root = 0;
    this.end = 0;
    this.sf = sort_function;
}

SortedList.Element = function(elem) {
    this.e = elem;
    this.p = 0;
    this.n = 0;
}

SortedList.prototype.add = function (elem) {
    var newElem = new SortedList.Element(elem);
    if (!this.root) {
        this.root = newElem;
        this.end = this.root;
        return;
    }
    
    if (this.sf(this.root.e, elem) <= 0) {
        this.root.p = newElem;
        newElem.n = this.root;
        
        this.root = newElem;
        return;
    }
    
    var cur = this.root;
    var prev;
    while (cur && this.sf(cur.e, elem) > 0) {
        prev = cur;
        cur = cur.n;
    }
    
    if (!cur) {
        if (prev != this.end) console.log('something went wrong, SortedList is corrupted');
    
        prev.n = newElem;
        newElem.p = prev;
        
        this.end = newElem;
        return;
    }
    var tmp = cur ? cur.n : 0;
    
    if (cur) cur.n = newElem;
    newElem.p = cur;
    
    if (tmp) tmp.p = newElem;
    newElem.n = tmp;
}

SortedList.prototype.foreach = function(fun) {
    var cur = this.root;
    while (cur) {
        fun(cur.e);
        cur = cur.n;
    }
}

SortedList.prototype.map = function(fun) {
    var result = [];
    var cur = this.root;
    while (cur) {
        result.push(fun(cur.e));
        cur = cur.n;
    }
}

var SortFunctions = {};

SortFunctions.date = function(a,b) {
    return Date.parse(a.date) - Date.parse(b.date);
}

SortFunctions.readLater = function(a,b) {
    return Date.parse(b.read_later) - Date.parse(a.read_later);
}
