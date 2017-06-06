(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherScheduleController', function ($q, $scope, $cookies, ServiceUtils, ScheduleServices, DAYS_OF_WEEK) {
            var vm = this;

            vm.addSection = () => {
                var newSection = {
                    startTime: parseInt(ServiceUtils.timeToMilitarFormat(vm.newSection.startTime.wickedpicker('time')).replace(':', '')),
                    endTime: parseInt(ServiceUtils.timeToMilitarFormat(vm.newSection.endTime.wickedpicker('time')).replace(':', '')),
                    day: vm.newSection.day.id
                };

                ScheduleServices.addSection(vm.teacherId, newSection)
                    .then(schedule => {
                        var day = schedule.days.find(day => { return day.day === newSection.day; });
                        var section = day.sections.find(section=>{return section.startTime === newSection.startTime && section.endTime === newSection.endTime});
                        section = parseSectionToEvent(section);
                        vm.events.push(section);
                        vm.calendar.fullCalendar('renderEvent', section);
                        alertify.success('La nueva sección ha sido adicionada con éxito.');
                    })
                    .catch(err => alertify.error(err.data));
            };

            function parseTime(time) {
                var time = time < 1000 ? '0' + time : time + '';
                return [time.substr(0, 2), time.substr(2, 2), '00'].join(':');
            }

            function parseSectionToEvent(section) {
                var date = moment().day(section.day).format('YYYY-MM-DD');
                return {
                    id: section.id,
                    title: 'Horario disponible',
                    start: date + 'T' + parseTime(section.startTime),
                    end: date + 'T' + parseTime(section.endTime),
                    section: section
                };
            }

            function initCtrl() {

                vm.days = DAYS_OF_WEEK;
                vm.teacherId = $cookies.get('userId');
                vm.newSection = {};
                vm.events = [];

                vm.newSection.startTime = angular.element('#startTime').wickedpicker({ now: "12:00", minutesInterval: 30 });
                vm.newSection.endTime = angular.element('#endTime').wickedpicker({ now: "12:00", minutesInterval: 30 });

                ScheduleServices.getSchedule(vm.teacherId)
                    .then(schedule => {
                        schedule.days.forEach(day => {
                            vm.events = vm.events.concat(day.sections.map(section => { return parseSectionToEvent(section); }));
                        });

                        vm.calendar = angular.element('#calendar').fullCalendar({
                            header: {
                                left: '',
                                center: '',
                                right: ''
                            },
                            defaultDate: moment().startOf('week').format('YYYY-MM-DD'),
                            defaultView: 'agendaWeek',
                            columnFormat: 'dddd',
                            events: vm.events,
                            eventClick: function (calEvent, jsEvent, view) {
                                alertify.confirm('¿Seguro deseas eliminar esta sección?', (e) => {
                                    if (e) {
                                        var section = vm.events.find(event=>{return event.id === calEvent._id}).section;
                                        ScheduleServices.deleteSection(vm.teacherId,section)
                                            .then(()=>vm.calendar.fullCalendar('removeEvents', calEvent._id))
                                            .catch(err=>console.log(err));    
                                    }
                                });
                            }
                        });
                    });
            }

            initCtrl();
        });
})();