(function () {
    'use strict';

    angular.module('schoolModule')
        .factory('SchoolServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var School = $resource(TU_PROFE_API + '/schools/:id', { id: '@id' });

            return {
                getAll: function () {
                    return School.query().$promise;
                }
            }
        });
})();