/* 
 * sort_function:
 * sort_function(a,b) > 0 if a comes before b
 */
function SortedList(sort_function, eq_function) {
    this.root = 0;
    this.sf = sort_function;
    this.ef = eq_function || function(a, b) {
        return a == b;
    };
}

SortedList.Element = function(elem) {
    this.e = elem;
    this.n = 0;
}

SortedList.prototype.add = function(elem) {
    var newElem = new SortedList.Element(elem);
    if (!this.root) {
        this.root = newElem;
        return;
    }

    if (this.sf(this.root.e, elem) <= 0) {
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
        prev.n = newElem;
        return;
    }

    var tmp = cur.n;

    if (cur)
        cur.n = newElem;
    newElem.n = tmp;
}

SortedList.prototype.remove = function(elem) {
    var cur = this.root;
    var prev = false;

    while (cur && !this.ef(cur.e, elem)) {
        prev = cur;
        cur = cur.n;
    }

    if (!cur)
        return false;
    if (!this.ef(cur.e, elem))
        return false;

    if (prev)
        prev.n = cur.n;
    else
        this.root = cur.n;

    return cur.e;
}

// fn_match(e) returns true if e should be removed
SortedList.prototype.removeAll = function(fn_match) {
    var cur = this.root;
    var prev = false;
    while (cur) {
        if (fn_match(cur.e)) {
            if (prev) {
                prev.n = cur.n;
            } else {
                this.root = cur.n;
            }
        }

        prev = cur;
        cur = cur.n;
    }
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
    return result;
}

SortedList.prototype.clear = function() {
    this.root = 0;
}

var SortFunctions = {};

SortFunctions.date = function(a, b) {
    return Date.parse(a.date) - Date.parse(b.date);
}

SortFunctions.readLater = function(a, b) {
    return Date.parse(b.read_later) - Date.parse(a.read_later);
}

var EqualFunctions = {};

EqualFunctions.msg = function(a, b) {
    return a.id == b.id;
}
