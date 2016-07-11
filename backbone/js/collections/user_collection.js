var UserCollection =  Backbone.Collection.extend({
    localStorage: UserStorage,
    model : UserModel,
});
