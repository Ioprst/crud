EssenceCreateView = ModalForm.extend({
    className :"modal essence-create",
    modalFormTemplate: '#modalform-template',
    actionName:'Create',
    events : {
        "click .save-ess":"onSaveForm",
        "click .cancel,.close":"onCancel",
        "submit form":"onSave"
    },
    onSaveForm:function() {
        this.onSave({
            onSuccess:this.onSuccess,
            onError:this.onError
        });
        return false;
    },
    onError:function() {

    },
    onSuccess:function() {
        this.collection.add(this.model);
        this.destroy();
    }
});