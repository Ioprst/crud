var UserStorage = new Backbone.LocalStorage('UserCollection');

var UserModel = EssenceModel.extend({
    localStorage: UserStorage,
    idAttribute: 'user_id',
    TITLE: 'User',
    nameAttribute:'nickname',
    defaults: {
        'nickname': '',
        'last_name': '',
        'middle_name': '',
        'email': '',
        'phone_number':''
    },
});

UserModel.getAttributeMap = function() {
    return {
        user_id:  {
            'label' : 'ID'
        },
        nickname:  {
            'field': 'input',
            'label' : 'Nickname'
        },
        department_id:  {
            'field': 'select',
            'label' : 'Departament',
            'dependClassName' : 'Departament'
        },
        person_id:  {
            'field': 'select',
            'label' : 'Person',
            'dependClassName' : 'Person'
        },
        position_id:  {
            'field': 'select',
            'label' : 'Position',
            'dependClassName' : 'Position'
        },
        super_user:  {
            'field': 'select',
            'label' : 'Super user',
            'dependClassName' : 'User'
        }
    }
};

