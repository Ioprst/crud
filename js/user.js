User = function() {
    function t() {
        Essence.apply(this, arguments);
        this.user_id = 0;
        this.nickname = '';
        this.department_id = '';
        this.person_id = '';
        this.position_id = '';
        this.super_user = '';
    };
    _extend(t, Essence);

    t.TABLE_NAME = 'user';
    t.TITLE = 'User';
    t.ID_ATTRIBUTE = 'user_id';
    t.NAME_ATTRIBUTE = 'nickname';

    t.getAttributeMap = function() {
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
    return t;
}()