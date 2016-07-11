EssenceModel = Backbone.Model.extend({
    getFormHTML: function() {
        var attributeMap = this.constructor.getAttributeMap();
        var formGroupHTML = '';
        var formGroupTemplate = _.template($('#formcontrol-template').html());

        for (var key in attributeMap) {
            if (key == this.idAttribute)
                continue;
            var value = this.get(key);
            var attrParams = attributeMap[key];
            var formControl =this.getFormControl(attrParams, key, value);

            formGroupHTML += formGroupTemplate({
                'attribute' : key,
                'formControl' :formControl,
                'params' : attrParams
            });
        }
        return formGroupHTML;
    },
    getFormControl: function(params, attribute, value) {
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
                    var dependClass = new window[dependClassName+'Collection'];
                    var dependModels = this.constructor.getDependData(dependClass);
                    for (var i = 0; i < dependModels.length; i++) {
                       var model = dependModels[i];
                       var attributes = model.toJSON();
                       var selected = attributes[model.idAttribute] == value ? 'selected' : '';
                       options +=  '<option '+ selected+' value="'+ attributes[model.idAttribute]+'">'+ attributes[model.nameAttribute]+'</option>';
                    }
                }
                control = '<select name="'+ attribute +'" value="'+ value +'" class="form-control"><option>Select ..</option>'+ options +'</select>';
                break;
        }
        return control;
    }
});

EssenceModel.getDependData = function(dependClass) {
    dependClass.fetch();
    return dependClass.models
};

EssenceModel.getAttributeLabels = function() {
    return Object.values(this.getAttributeMap());
};

EssenceModel.getAttributes = function() {
    return Object.keys(this.getAttributeMap());
};

EssenceModel.generateTableHeader = function(){
    var attributes = this.getAttributeLabels();
    var thead  = '<thead><tr>';
    for (var i = 0; i < attributes.length; i++) {
       thead += '<td>' + attributes[i]['label'] + '</td>';
    }
    thead += '<td>Actions</td</tr></thead>';
    return thead;
};

