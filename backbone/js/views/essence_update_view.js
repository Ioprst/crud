EssenceUpdateView = EssenceCreateView.extend({
    className :"modal essence-edit",
    modalFormTemplate: '#modalform-template',
    actionName:'Edit',
    onSuccess:function() {
        this.collection.trigger('model:change',this.model)
        this.destroy();
    }
});