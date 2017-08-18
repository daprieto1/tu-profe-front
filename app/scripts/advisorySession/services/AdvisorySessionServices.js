(function () {
    angular.module('advisorySessionModule')
        .factory('AdvisorySessionServices', function ($resource, $q, $http, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var AdvisorySession = $resource(TU_PROFE_API + '/advisory-sessions/:advisoryServiceId/:sessionId', { advisoryServiceId: '@advisoryServiceId', sessionId: '@sessionId' }, {
                update: {
                    method: 'PUT',
                    url: TU_PROFE_API + '/advisory-sessions/:advisoryServiceId/:sessionId',
                    params: { advisoryServiceId: '@advisoryServiceId', sessionId: '@sessionId' }
                }
            });

            return {
                update: (advisoryServiceId, sessionId, session) => {
                    return AdvisorySession.update({ advisoryServiceId: advisoryServiceId, sessionId: sessionId }, session).$promise;
                }
            };
        });
})();