var EssenceView = Backbone.View.extend({
    setModel:function(collection) {
        this.objects = {};
        this._unbindEvents();
        this.collection = null;

        this.collection = collection;
        this._bindEvents();
        this.collection.fetch({reset:true});
    },
    _bindEvents:function() {
        this.collection.on("add", this.onAdd, this);
        this.collection.on("model:change", this.onUpdate, this);
        this.collection.on("remove", this.onRemove, this);
    },
    _unbindEvents:function() {
        if (!this.collection) return;
        this.collection.off("add");
        this.collection.off("remove");
    },
    onAdd: function(e) {
        this.objects[e.cid] = new EssenceTableView({model:e});
        this.$el.append(this.objects[e.cid].render().el);

        $.jGrowl("Сохранено");
        return this;
    },
    onUpdate: function(e) {
        $.jGrowl("Запись обновлена");
        return this;
    },
    onRemove: function(e) {
        if (this.objects[e.cid])
            $(this.objects[e.cid].el).remove();

        $.jGrowl("Запись удалена");
        return this;
    },
    render: function() {
        $('#essence-title').html(this.collection.model.prototype.TITLE);
        var tableHeader = this.collection.model.generateTableHeader();
        this.$el.html(tableHeader);
        var o = this.collection.models;
        for (var i = 0; i < o.length; i++) {
            this.objects[o[i].cid] = new EssenceTableView({model:o[i]});
            this.$el.append(this.objects[o[i].cid].render().el);
        };

        this.$el.show();
        return this;
    },
    destroy: function() {
        this.collection.off("add", this.onAdd);
        this.collection.off("remove", this.onRemove);
        return this;
    },
    onClickAddModel: function(){
        var new_essence = new this.collection.model;

        var essenceCreateView = new EssenceCreateView({
            model:new_essence,
            collection:this.collection
        });

        essenceCreateView.render();
        return false;
    },
});
