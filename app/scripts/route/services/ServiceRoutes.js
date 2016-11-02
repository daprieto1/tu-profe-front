(function() {
    'use strict';

    angular.module('routeModule')
        .factory('ServiceRoute', function($resource) {

            var Route = $resource('http://localhost:8080/route/:idRoute', { idRoute: '@idRoute' }, {
                getRoutesByUser: {
                    method: 'GET',
                    params: { idUser: '@idUser' },
                    url: 'http://localhost:8080/route/get-routes-by-user/:idUser',
                    isArray: true,
                    withCredentials: true
                },
                solve: {
                    method: 'POST',
                    url: 'http://localhost:8080/route/solve/:idRoute',
                },
                update: {
                    method: 'PUT'
                }
            });

            return {
                getRoutesByUser: function(idUser) {
                    return Route.getRoutesByUser({ idUser: idUser }).$promise;
                },

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