(function () {
    'use strict';

    angular.module('scheduleModule')
        .factory('ScheduleServices', function ($resource, $http, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Schedule = $resource(TU_PROFE_API + '/schedules/:id', { id: '@id' }, {
                addSection: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/schedules/:scheduleId/sections',
                    method: 'POST'
                }
            });

            return {
                getSchedule: id => {
                    return Schedule.get({ id: id }).$promise;
                },

                addSection: (scheduleId, section) => {
                    return Schedule.addSection({ scheduleId: scheduleId }, section).$promise;
                },
                
                deleteSection: (scheduleId, section) => {
                    return $http({
                        method: 'DELETE',
                        url:TU_PROFE_API + '/schedules/'+scheduleId+'/sections',
                        data: section,
                        headers: {'Content-Type': 'application/json'}
                    });
                }
            }
        });
})();