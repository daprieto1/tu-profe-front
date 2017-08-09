(function () {
    'use strict';

    angular.module('cityModule')
        .factory('CityServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var City = $resource(TU_PROFE_API + '/cities/:id', { id: '@id' });

            return {

                getAll: function () {
                    return City.query().$promise;
                }

            }
        });
})();