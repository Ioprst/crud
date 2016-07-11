Person = function() {
    function t() {
        Essence.apply(this, arguments);
        this.person_id = 0;
        this.first_name = '';
        this.last_name = '';
        this.middle_name = '';
        this.email = '';
        this.phone_number = 0;
    };
    _extend(t, Essence);

    t.TABLE_NAME = 'person';
    t.TITLE = 'Person';
    t.ID_ATTRIBUTE = 'person_id';
    t.NAME_ATTRIBUTE = 'first_name';

    t.getAttributeMap = function() {
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
    };

    return t;
}()