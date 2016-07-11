var PositionStorage = new Backbone.LocalStorage('PositionCollection');

var PositionModel = EssenceModel.extend({
    localStorage: PositionStorage,
    idAttribute: 'position_id',
    TITLE: 'Position',
    nameAttribute:'position_name',
    defaults: {
        'position_name': '',
        'salary': '8000',
    },
});

PositionModel.getAttributeMap = function() {
    return {
          position_id:  {
              'label' : 'ID'
          },
          position_name:  {
              'field': 'input',
              'label' : 'Name'
          },
          salary:  {
              'field': 'input',
              'label' : 'Salary'
          },
    }
};

