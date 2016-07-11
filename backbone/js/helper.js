
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

var ModalView = Backbone.View.extend({
    show:function () {
        this.$el.modal();
        $(document).on("keydown", "body",  this._onKeydown.bind(this));
    },
    destroy:function () {
       this.$el.modal("hide");
       $(document).off("keydown", "body", this._onKeydown.bind(this));
       this.$el.remove();
    },
    _onKeydown:function (e) {
        if (e.which == 27) {
            this.destroy();
        }
    }
});

var ModalForm = ModalView.extend({
    onSave:function(o){
        var self = this;
        var modelAttributeMap = this.model.constructor.getAttributeMap();
        delete modelAttributeMap[this.model.idAttribute];

        var attrs = this._parseForm(modelAttributeMap);

        var _onError = function() {
            self._onSaveError.apply(self, arguments);
            if (o && o.onError) self.onError(arguments);
        };
        var _onSuccess = function() {
            self._onSaveSuccess.apply(self, arguments);
            if (o && o.onSuccess) self.onSuccess(arguments);
        };
        this.model.save(attrs, {
            success:_onSuccess,
            error:_onError,
        });
        return false;
    },
    onCancel:function(o){
        if (this.model && this.model.isNew())
            this.model.destroy();
        this.destroy();
        return this;
    },
    _onSaveSuccess:function(o, e) {
        this.destroy();
    },
    _onSaveError:function(o, e) {
        e.status == 400 ? this._handleFormError(e.errors()) : this.$el.find('.form-error').html(e.responseText).show();
    },
    _parseForm:function(e) {
        var o = {};
        var keys = _.keys(e);
        for (var i = 0; i < keys.length; i++) {
            var value = this.$el.find('.form-control[name="'+ keys[i]+'"]').val();
            o[keys[i]] = value;
        };
        return o;
    },
    _validateForm:function(e) {
        var keys = _.keys(e);
        for (var i = 0; i < keys.length; i++) {
            var _el = this.$el.find('[name="'+ keys[i]+'"]');
            var value = $(_el).val();
            if (!value) {
                var self = this;
                $(_el).on("change keyup", function(e) {self._clearFormError(keys[i])});
                this._handleFormError(keys[i],e['name']['empty'])
                return false;
            }
        };
        return true;
    },
    _handleFormError:function(e, o) {
        this.$el.find('.form-group.model-' + e).addClass('has-error');
        this.$el.find('.help-block').html(o);
    },
    _clearFormError:function(e) {
        this.$el.find('.form-group.model-' + e).find('[name="'+e+'"]').off('change keyup');
        this.$el.find('.form-group.model-' + e).removeClass('has-error');
        this.$el.find('.form-group.model-' + e).find('.help-block').html('');
    },
    render:function(){
        var modalFormTemplate = _.template($(this.modalFormTemplate).html());

        this.$el.html(modalFormTemplate({
            title : this.actionName + ' '+ this.model.TITLE,
            id: this.model.get('id'),
            content : this.model.getFormHTML(),
        }));

        $("body").append(this.$el);
        this.show();
        this.$("input:first").focus();
        return this;
    },
});
