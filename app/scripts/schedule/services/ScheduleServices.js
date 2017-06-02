(function () {
    'use strict';

    angular.module('scheduleModule')
        .factory('ScheduleServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var School = $resource(TU_PROFE_API + '/schedules/:id', { id: '@id' });

            return {
                getSchedule: function (id) {
                    return School.get({ id: id }).$promise;
                }
            }
        });
})();