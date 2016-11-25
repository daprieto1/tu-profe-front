(function() {
    'use strict';

    angular.module('routeModule')
        .factory('ServicePoints', function($resource) {

            var Point = $resource('localhost:1337/point/:idPoint', { idRoute: '@idPoint' }, {
                bulkSave: {
                    method: 'POST',
                    url: 'localhost:8080/route/bulk-save/:idRoute',
                    isArray: true,
                    withCredentials: true
                },
                bulkDelete: {
                    method: 'POST',
                    url: 'localhost:8080/route/bulk-delete/:idRoute'
                }
            });

            return {
                bulkDelete: function(idRoute, points) {
                    return Point.bulkDelete({ idRoute: idRoute }, points).$promise;
                },
                bulkSave: function(idRoute, points) {
                    return Point.bulkSave({ idRoute: idRoute }, points).$promise;
                }
            }
        });
})();
saveRoute: function(route) {
        return new Route(route).$save();
    },

    getRoute: function(idRoute) {
        return Route.get({ idRoute: idRoute }).$promise;
    },

    solve: function(idRoute) {
        return Route.solve({ idRoute: idRoute }).$promise;
    },

    update: function(route) {
        return Route.update({}, route).$promise;
    },

    delete: function(idRoute) {
        return Route.remove({ idRoute: idRoute }).$promise;
    }
};
});
})();