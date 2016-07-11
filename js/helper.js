
if (!Object.values) {
    Object.values = function (obj) {
        var vals = [];
        for( var key in obj ) {
            if ( obj.hasOwnProperty(key) ) {
                vals.push(obj[key]);
            }
        }
        return vals;
    }
}

window._extend = function (child, parent) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function i() {
        this.constructor = child;
    }
    for (var prop in parent) {
       if(hasOwnProperty.call(parent, prop)) {
            child[prop] = parent[prop];
       }
    }
    i.prototype = parent.prototype;
    child.prototype = new i;
}

window._bootstrapModalTeplate = function(title, content) {
   return '<div class="modal fade" tabindex="-1" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '<h4 class="modal-title">' + title + '</h4>' +
    '</div>' +
    '<div class="modal-body">' + content + '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
}
