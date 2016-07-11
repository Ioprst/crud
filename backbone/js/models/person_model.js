var PersonStorage = new Backbone.LocalStorage('PersonCollection'),
PersonModel = EssenceModel.extend({
    localStorage: PersonStorage,
    idAttribute: 'person_id',
    TITLE: 'Person',
    nameAttribute:'first_name',
    defaults: {
        'first_name': '',
        'last_name': '',
        'middle_name': '',
        'email': '',
        'phone_number':''
    },
});
PersonModel.getAttributeMap = function() {
    return {
        person_id:  {
            'label' : 'ID'
        },
        first_name:  {
            'field': 'input',
            'label' : 'First Name'
        },
        last_name:  {
            'field': 'input',
            'label' : 'Last name'
        },
        middle_name:  {
            'field': 'input',
            'label' : 'Middle name'
        },
        email:  {
            'field': 'input',
            'label' : 'Email',
        },
        phone_number:  {
            'field': 'input',
            'label' : 'Phone',
        }
    }
}

