(function() {
    'use strict';

    angular.module('routeModule')
        .factory('ServiceSolution', function($resource, $rootScope) {

            var Solution = $resource($rootScope.routeApi + '/solution/:idSolution', { idSolution: '@idSolution' }, {
                getSolutionByRoute: {
                    method: 'GET',
                    params: { idRoute: '@idRoute' },
                    url: $rootScope.routeApi + '/solution/:idRoute',
                    isArray: false,
                    withCredentials: true
                },
                createRoutesInMu: {
                    method: 'POST',
                    params: { idRoute: '@idRoute' },
                    url: $rootScope.routeApi + '/solution/create-routes-in-mu/:idRoute'
                }
            });

            return {
                getSolutionByRoute: function(idRoute) {
                    return Solution.getSolutionByRoute({ idRoute: idRoute }).$promise;
                },
                createRoutesInMu: function(idRoute, routes) {
                    return Solution.createRoutesInMu({ idRoute: idRoute }, routes).$promise;
                }
            };
        });
})();