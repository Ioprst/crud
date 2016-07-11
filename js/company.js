Company = function() {
    function t() {
        Essence.apply(this, arguments);
        this.company_id = 0;
        this.company_name = '';
        this.description = '';
        this.logo = '';
    };
    _extend(t, Essence);

    t.TABLE_NAME = 'company';
    t.TITLE = 'Company';
    t.ID_ATTRIBUTE = 'company_id';
    t.NAME_ATTRIBUTE = 'company_name';

    t.getAttributeMap = function() {
        return {
            company_id:  {
                'label' : 'ID'
            },
            company_name:  {
                'field': 'input',
                'label' : 'Company'
            },
            description:  {
                'field': 'text',
                'label' : 'Description'
            }, 
            logo:  {
                'field': 'input',
                'label' : 'Logo',
            }
        }
    };
    return t;
}()