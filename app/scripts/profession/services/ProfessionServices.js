(function () {
    'use strict';

    angular.module('professionModule')
        .factory('ProfessionServices', function ($resource, TU_PROFE_API) {
            var Profession = $resource(TU_PROFE_API + '/professions/:id', { id: '@id' });

            return {
                getAll: function () {
                    return Profession.query().$promise;
                }
            }
        });
})();