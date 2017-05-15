(function () {
    'use strict';

    angular.module('advisoryServiceModule')
        .factory('AdvisoryServiceServices', function ($resource, $q, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var AdvisoryService = $resource(TU_PROFE_API + '/advisory-services/:id', { id: '@id' }, {
                calculate: {
                    method: 'POST',
                    url: TU_PROFE_API + '/advisory-services/calculate'
                },

                getAllByStudentId: {
                    url: TU_PROFE_API + '/advisory-services/get-by-student/:studentId',
                    params: { studentId: '@studentId' },
                    method: 'GET',
                    isArray: true
                }
            });

            return {
                getAllByStudentId: studentId => {
                    return AdvisoryService.getAllByStudentId({ studentId: studentId }).$promise;
                },

                create: advisoryService => {
                    return AdvisoryService.save(advisoryService).$promise;
                },
                
                calculate: advisoryService => {
                    return AdvisoryService.calculate(advisoryService).$promise;
                }

            }
        });
})();