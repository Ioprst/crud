Departament = function() {
    function t() {
        Essence.apply(this, arguments);
        this.department_id = 0;
        this.department_name = '';
        this.company_id = '';
    };
    _extend(t, Essence);

    t.TABLE_NAME = 'departament';
    t.TITLE = 'Departament';
    t.ID_ATTRIBUTE = 'department_id';
    t.NAME_ATTRIBUTE = 'department_name';

    t.getAttributeMap = function() {
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
    };
    return t;
}()