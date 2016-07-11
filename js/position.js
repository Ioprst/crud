Position = function() {
    function t() {
        Essence.apply(this, arguments);
        this.position_id = 0;
        this.position_name = '';
        this.salary = '';
    };
    _extend(t, Essence);

    t.TABLE_NAME = 'position';
    t.TITLE = 'Position';
    t.ID_ATTRIBUTE = 'position_id';
    t.NAME_ATTRIBUTE = 'position_name';

    t.getAttributeMap = function() {
        return {
            position_id:  {
                'label' : 'ID'
            },
            position_name:  {
                'field': 'input',
                'label' : 'Postion Name'
            },
            salary:  {
                'field': 'input',
                'label' : 'Salary'
            }, 
        }
    };
    return t;
}()