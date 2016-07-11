var AppRouter = Backbone.Router.extend({

    routes: {
        "person":"person",
        "user": "user",
        "position": "position",
        "departament": "departament",
        "company": "company",
    },
    initialize: function() {
        this.personCollection = new PersonCollection();
        this.userCollection = new UserCollection();
        this.positonCollection = new PositionCollection();
        this.companyCollection = new CompanyCollection();
        this.departamentCollection = new DepartamentCollection();

        this.essenceView = new EssenceView({
            el:$("#table-content"),
        });
        this.toolbarView = new ToolbarView({
            el: $("#table-actions"),
            essenceView : this.essenceView
        });
    },

    person: function() {
        this.essenceView.setModel(this.personCollection);
        this.essenceView.render();
    },

    user: function(query, page) {
        this.essenceView.setModel(this.userCollection);
        this.essenceView.render();
    },
    position: function() {
        this.essenceView.setModel(this.positonCollection);
        this.essenceView.render();
    },

    departament: function() {
        this.essenceView.setModel(this.departamentCollection);
        this.essenceView.render();
    },

    company: function() {
        this.essenceView.setModel(this.companyCollection);
        this.essenceView.render();
    },
});