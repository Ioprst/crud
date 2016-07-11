var EssenceTableView = Backbone.View.extend({
    tagName:'tr',
    events:{
        "click .btn.remove-ess": "onClickDeleteEssence",
        "click .btn.edit-ess": "onClickEditEssence",
    },
    initialize: function(){
        _.bindAll(this, "render");
        this.model.bind('change', this.render);
    },
    onClickDeleteEssence: function() {
        if(confirm('Are you sure?'))
            this.model.destroy();
        return false;
    },
    onClickEditEssence: function() {
        var essenceUpdateView = new EssenceUpdateView({
            model:this.model,
            collection:this.model.collection
        });
        essenceUpdateView.render();
        return false;
    },
    render: function() {
        var model = this.model;
        var attributeMap = model.constructor.getAttributeMap();
        var row = '';

        for (var attr in  attributeMap) {
            var attributeParams = attributeMap[attr];
            var value = model.get(attr);
            if (attributeParams.dependClassName && value) {
                var dependClass = new window[attributeParams.dependClassName + 'Collection'];
                dependClass.fetch();
                var _model = dependClass.get(value);
                if (_model)
                    value = _model.get(_model.nameAttribute);
            }
            row += '<td>' + value+'</td>';
        }
        row += this.renderRowActions();
        this.$el.html(row);
        this.$el.attr('data-row', model.id);
        return this;
    },
    renderRowActions: function() {
        var template = _.template($('#tablerowactions-template').html());
        return template({id:this.model.id});
    }
})