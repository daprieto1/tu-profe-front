(function () {
    'use strict';

    angular.module('advisoryServiceModule')
        .factory('AdvisoryServiceServices', function ($resource, $q, $http, envService) {
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
                },

                filter: {
                    url: TU_PROFE_API + '/advisory-services/filter',
                    method: 'POST',
                    isArray: true
                },

                assign: {
                    url: TU_PROFE_API + '/advisory-services/assign/:advisoryServiceId/:teacherId',
                    params: { advisoryServiceId: '@advisoryServiceId', teacherId: '@teacherId' },
                    method: 'POST'
                },
                
                getAvailableServices:{
                    url: TU_PROFE_API + '/advisory-services/available-services/:teacherId',
                    params: { teacherId: '@teacherId' },
                    method: 'GET',
                    isArray: true
                }
            });

            return {

                assign: (advisoryServiceId, teacherId) => {
                    return AdvisoryService.assign({ advisoryServiceId: advisoryServiceId, teacherId: teacherId }).$promise;
                },
                
                getAvailableServices: teacherId => {
                    return AdvisoryService.getAvailableServices({teacherId:teacherId}).$promise;
                },

                filter: params => {
                    return AdvisoryService.filter(params).$promise;
                },

                getAdvisoryService: advisoryServiceId => {
                    return AdvisoryService.get({ id: advisoryServiceId }).$promise;
                },

                getAllByStudentId: studentId => {
                    return AdvisoryService.getAllByStudentId({ studentId: studentId }).$promise;
                },

                create: advisoryService => {
                    return AdvisoryService.save(advisoryService).$promise;
                },

                calculate: advisoryService => {
                    return AdvisoryService.calculate(advisoryService).$promise;
                },

                uploadFile: function (file, advisoryServiceId) {
                    var fd = new FormData();
                    fd.append('file', file);
                    fd.append('advisoryServiceId', advisoryServiceId)

                    return $http({
                        url: TU_PROFE_API + '/advisory-services/files/' + advisoryServiceId,
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                }

            }
        });
})();