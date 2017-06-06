(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherCalendarController', function ($q, $cookies, ServiceTeachers, AdvisoryServiceServices) {
            var vm = this;

            function getColor() {
                var colors = ['#f86363', '#63f8ce', '#639ff8', '#8d63f8', '#f8d063'];
                vm.i = vm.i === colors.length ? 0 : vm.i + 1;
                return colors[vm.i];
            }

            function parseAdvisoryServiceToEvent(advisoryService) {
                var events = [];
                var color = getColor();
                events = advisoryService.sessions.map(session => {
                    var startTime = session.startTime.split(':');
                    var startDate = moment(session.startDate);
                    startDate.set({ hour: parseInt(startTime[0]), minute: parseInt(startTime[1]) });

                    var endDate = angular.copy(startDate);
                    endDate.add(session.duration, 'm');
                    
                    return {
                        title: 'Horario de clase',
                        start: startDate.format('YYYY-MM-DDTHH:mm'),
                        end: endDate.format('YYYY-MM-DDTHH:mm'),
                        color: color
                    };
                });
                return events;
            }

            function initCtrl() {
                vm.i = 0;
                vm.events = [];
                vm.teacherId = $cookies.get('userId');

                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(teacher => {
                        console.log(teacher);
                        teacher.advisoryServices = ['a8d6692e-60fd-494f-91d8-c63b62555e43','718b60db-738c-43a8-a5d1-c59442bc9f40','d0b25633-ef78-4a0e-952b-3cca78aa5a9e'];
                        var requests = teacher.advisoryServices.map(advisoryService => { return AdvisoryServiceServices.getAdvisoryService(advisoryService); });
                        $q.all(requests)
                            .then(advisoryServices => {
                                advisoryServices.forEach(advisoryService => {
                                    vm.events = vm.events.concat(parseAdvisoryServiceToEvent(advisoryService));
                                });
                                console.log(vm.events);
                                vm.calendar = angular.element('#calendar').fullCalendar({
                                    header: {
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'month,agendaWeek,agendaDay'
                                    },
                                    defaultDate: moment().startOf('week').format('YYYY-MM-DD'),
                                    defaultView: 'month',
                                    editable: true,
                                    events: vm.events
                                });
                            })
                            .catch(err => console.log(err));
                    });
            }

            initCtrl();
        });
})();