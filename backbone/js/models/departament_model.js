var DepartamentStorage = new Backbone.LocalStorage('DepartamentCollection');

var DepartamentModel = EssenceModel.extend({
    localStorage: DepartamentStorage,
    idAttribute: 'department_id',
    TITLE: 'Departament',
    nameAttribute:'department_name',
    defaults: {
        'department_name': '',
        'company_id': '',
    },
});

DepartamentModel.getAttributeMap = function() {
    return {
        department_id:  {
            'label' : 'ID'
        },
        department_name:  {
            'field': 'input',
            'label' : 'Name'
        },
        company_id:  {
            'field': 'select',
            'label' : 'Company',
            'dependClassName' : 'Company'
        },
    }
}

