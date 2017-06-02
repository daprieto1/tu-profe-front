(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherScheduleController', function ($q, $scope, $cookies, ServiceTeachers, ScheduleServices) {
            var vm = this;

            vm.changeSpecificSession = function (day, section, value) {
                vm.schedule[section][day] = value;
            };

            vm.changeSection = function (idSection) {
                var positiveChange = vm.schedule[idSection].includes(false);
                if (positiveChange) {
                    vm.schedule[idSection] = vm.schedule[idSection].map(function (obj) {
                        return true;
                    });
                    console.log(vm.schedule);
                } else {
                    vm.schedule[idSection] = vm.schedule[idSection].map(function (obj) {
                        return false;
                    });
                }
            };

            vm.getScheduleTime = function (sectionId) {
                return vm.scheduleTimes[sectionId];
            };

            vm.updateSchedule = function () {
                var schedule = [].concat.apply([], vm.schedule).map(function (obj) {
                    return obj ? '1' : '0';
                }).join('');

                vm.teacher.schedule = schedule;

                ServiceTeachers.update(vm.teacher)
                    .then(function () {
                        console.log('OK');
                    });

            };

            function parseTime(time) {
                var time = time < 1000 ? '0' + time : time + '';
                return [time.substr(0, 2), time.substr(2, 2), '00'].join(':');
            }

            function initCtrl() {

                vm.teacherId = $cookies.get('userId');

                ScheduleServices.getSchedule(vm.teacherId)
                    .then(schedule => {
                        var events = [];
                        schedule.days.forEach(day => {
                            events = events.concat(day.sections.map(section => {
                                var date = moment().day(section.day).format('YYYY-MM-DD');
                                return {
                                    title: 'Horario disponible',
                                    start: date + 'T' + parseTime(section.startTime),
                                    end: date + 'T' + parseTime(section.endTime),
                                };
                            }));
                        });
                       
                        console.log(events);
                        angular.element('#calendar').fullCalendar({
                            header: {
                                left: '',
                                center: '',
                                right: ''
                            },
                            defaultDate: moment().startOf('week').format('YYYY-MM-DD'),
                            defaultView: 'agendaWeek',
                            columnFormat: 'dddd',
                            events: events
                        });
                    });
            }

            initCtrl();
        });
})();