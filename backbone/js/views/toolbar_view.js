var ToolbarView = Backbone.View.extend({
    events:{
        "click #new-ess": "onClickAddModel"
    },
    initialize: function(options) {
        this.options = options || {};
    },
    onClickAddModel :function(){
        this.options.essenceView.onClickAddModel();
        return false;
    }
});
