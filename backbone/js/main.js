$(function() {
    var router = new AppRouter;

    router.bind('all', function(route) {
        if (route == 'route')
            return;
        route = route.replace('route:', '');
        $('#essence-menu').find('li').removeClass('active');
        $('#essence-menu').find('a[data-ess='+route+']').parent('li').addClass('active');
        $('#table-actions').show();
    });

    Backbone.history.start();
});