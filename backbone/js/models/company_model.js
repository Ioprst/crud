var CompanyStorage = new Backbone.LocalStorage('CompanyCollection');

var CompanyModel = EssenceModel.extend({
    localStorage: CompanyStorage,
    idAttribute: 'company_id',
    nameAttribute:'company_name',
    TITLE: 'Company',

    defaults: {
        'company_name': '',
        'description': '',
        'logo': '',
    },
});

CompanyModel.getAttributeMap = function() {
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

