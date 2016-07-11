Essence = function() {
    function t() {
        this.errors = [];
    };
    var DELAY = 1500;

    t.prototype._handleError = function(err) {
        var message;
        if (!err) return;
        message = null;
        switch (err) {
          case "empty":
            message = "Значение не должно быть пустым";
            break;
        }
        return message;
    }

    t.prototype.validate = function(data) {
        var isValid = true;
        for (var i = 0; i < data.length; i++) {
            var attributeGroup = data[i];

            if (!attributeGroup['value']) {
                this.errors.push({
                    name:attributeGroup['name'],
                    message:this._handleError('empty')
                })
                isValid = false;
            }
        }
        return isValid;
    };

    t.prototype.save = function(data, options) {
        if (this.validate(data)) {
            var data = this.normalizeData(data);
            $.extend(this, data);
            var saver = this._save();
            saver.done(function(){
                options.success(this)
            })
            saver.fail( function(){
                options.error(this,[])
            })
        } else {
            options.error(this, this.errors);
        }
    };

    t.prototype._save = function () {
        var saver = new $.Deferred();
        var _this = this;
        setTimeout(function() {
            _this._sync();
            saver.resolve();
        }, DELAY);
        return saver.promise();
    };

    t.prototype._sync= function  () {
        var tableName = this.getTableName();
        var store =  this.constructor.findAll();

        store['last_id'] = this.constructor.getLastId();

        if (this.isNew()) {
            this[this.constructor.ID_ATTRIBUTE] = this.constructor.generateId();
            store['last_id'] = this.getId();
        }
        store[this.getId()] = this.getSaveData();
        LocalStorage.set(tableName, store);
    };

    t.prototype.normalizeData = function(data) {
        var result = {};
        for (var i = 0; i < data.length; i++) {
            result[data[i]['name']] = data[i]['value']
        }
        return result;
    };

    t.prototype.getFormHTML = function() {
        var attributeMap = this.constructor.getAttributeMap();
        var formGroupHTML = '';
        for (var key in attributeMap) {
            if (key == this.constructor.ID_ATTRIBUTE)
                continue;
            var value = this[key];
            var attrParams = attributeMap[key];
            formGroupHTML += this._formGroupTemplate(attrParams, key, value);
        }
        return this._formTemplate(formGroupHTML, this.getId());
    };

    t.prototype._formGroupTemplate = function(params, attribute, value) {
        var formControl = this._getFormControl(params, attribute, value);

        return '<div id="form-'+ attribute +'" class="form-group">'+
                '<label class="control-label">'+params['label']+'</label>'
                    + formControl +
                '<div class="help-block"></div>'+
        '</div>'
    }

    t.prototype._formTemplate = function(form, id) {
        return '<form id="ess-form" method="POST" data-ess="'+id+'" action="#" class="ess-form">'+form+'<div class="form-group">'+
            '<button class="btn btn-success save-ess" type="submit">Save</button></div>'+
       '</form>';
    }

    t.prototype._getFormControl = function(params, attribute, value) {
        var control = '';
        switch (params['field']) {
            case 'input':
                control = '<input type="text" name="'+ attribute+'" value="'+ value +'" class="form-control">';
                break;
            case 'text':
                control = '<textarea name="'+ attribute+'" value="'+ value +'" class="form-control">'+ value +'</textarea>';
                break;
            case 'select':
                var options ='';
                if (params['dependClassName']) {
                    var dependClassName = params['dependClassName'];
                    var dependClass = window[dependClassName];
                    var dependData = this.constructor.getDependData(dependClassName);
                    for (var i = 0; i < dependData.length; i++) {
                       var dep = dependData[i];
                       var selected = dep[dependClass.ID_ATTRIBUTE] == value ? 'selected' : '';
                       options +=  '<option '+selected+' value="'+ dep[dependClass.ID_ATTRIBUTE]+'">'+ dep[dependClass.NAME_ATTRIBUTE]+'</option>';
                    }

                }
                control = '<select name="'+ attribute +'" value="'+ value +'" class="form-control"><option>Select ..</option>'+ options +'</select>';
                break;
        }
        return control;
    }

    t.prototype.getSaveData = function () {
        var saveData = {};
        var attributes = this.constructor.getAttribute();

        for (var i = 0; i < attributes.length; i++) {
            saveData[attributes[i]] = this[attributes[i]];
        }
        return saveData;
    };

    t.prototype.isNew = function () {
        return this.getId() == 0;
    };

    t.prototype.getId = function () {
        return this[this.constructor.ID_ATTRIBUTE];
    };

    t.getModel = function(id) {
        var record = this.find(id);
        var model = new this;
        $.extend(model, record);
        return model;
    };

    t.prototype.getTableName = function() {
        return this.constructor.TABLE_NAME;
    };

    t.getAttributeLabels = function() {
        return Object.values(this.getAttributeMap());
    };

    t.getAttribute = function() {
        return Object.keys(this.getAttributeMap());
    };

    t.generateId = function() {
        return this.getLastId() + 1;
    };

    t.removeRecord = function(id, options) {
        var remover = this._removeRecord(id);
        remover.done(function(){
            options.success(id)
        })
        remover.fail( function(){
            options.error(id)
        })
    };

    t._removeRecord = function(id) {
        var remover = new $.Deferred();
        var _this = this;
        var store = _this.findAll();
        setTimeout(function() {
            if (store[id]) {
                delete store[id];
                LocalStorage.set(_this.TABLE_NAME, store);
            }
            remover.resolve();
        }, DELAY);
        return remover.promise();
    }

    t.find = function(id) {
        var store = this.findAll();
        delete store['last_id'];
        return store[id];
    };

    t.findAll = function() {
        var store = LocalStorage.get(this.TABLE_NAME);
        if (store) {
            delete store['last_id'];
            return store;
        } else return {};
    };

    t.getLastId = function() {
        var store =  LocalStorage.get(this.TABLE_NAME);
        return store && store['last_id'] ? store['last_id'] : 0;

    };
    t.getDependData = function(dependClassName) {
        var dependClass = window[dependClassName];
        return Object.values(dependClass.findAll());
    }

    return t;
}()