(function () {
    'use strict';

    angular.module('advisoryServiceModule')
        .factory('AdvisoryServiceServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var AdvisoryService = $resource(TU_PROFE_API + '/advisory-services/:id', { id: '@id' }, {
                calculate: {
                    method: 'POST',
                    url: TU_PROFE_API + '/advisory-services/calculate'
                }
            });

            return {

                create: advisoryService => {
                    return AdvisoryService.save(advisoryService).$promise;
                },

                calculate: advisoryService => {
                    return AdvisoryService.calculate(advisoryService).$promise;
                }

            }
        });
})();