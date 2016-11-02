(function() {
    'use strict';

    angular.module('routeModule')
        .factory('ServiceSolution', function($resource) {

            var Solution = $resource('http://localhost:8080/solution/:idSolution', { idSolution: '@idSolution' }, {
                getSolutionByRoute: {
                    method: 'GET',
                    params: { idRoute: '@idRoute' },
                    url: 'http://localhost:8080/solution/:idRoute',
                    isArray: false,
                    withCredentials: true
                }
            });

            return {
                getSolutionByRoute: function(idRoute) {
                    return Solution.getSolutionByRoute({ idRoute: idRoute }).$promise;
                }
            };
        });
})();