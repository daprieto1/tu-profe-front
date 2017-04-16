(function () {
    'use strict';

    angular.module('trainingModule')
        .factory('TrainingServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Training = $resource(TU_PROFE_API + '/trainings/:id', { id: '@id' })

            return {

                getAll: function () {
                    return Training.query().$promise;
                },

                get: function (trainingId) {
                    return Training.get({ id: trainingId }).$promise;
                }

            }
        });
})();