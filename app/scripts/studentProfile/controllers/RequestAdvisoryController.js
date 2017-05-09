(function () {
    'use strict';

    angular.module('studentProfileModule')
        .controller('RequestAdvisoryController', function ($scope, ServiceUtils, DAYS_OF_WEEK, ADVISORY_SERVICES_TYPE) {
            var vm = this;

            vm.disableDayOfWeekButton = index => {
                var activeDays = vm.service.daysOfWeek.filter(day => { return day; }).length;
                if (activeDays >= vm.service.sessionsPerWeek && !vm.service.daysOfWeek[index]) {
                    vm.disable = true;
                } else {
                    vm.disable = false;
                }
                return vm.disable;
            };

            vm.selectDayOfWeek = index => {
                if ((vm.disable && vm.service.daysOfWeek[index]) || (!vm.disable)) {
                    vm.service.daysOfWeek[index] = !vm.service.daysOfWeek[index]
                }
            };

            vm.changeSessionsPerWeek = () => {
                vm.service.daysOfWeek = [false, false, false, false, false, false, false];
            };

            vm.createService = () => {
                var service = angular.copy(vm.service);

                service.type = 1;
                service.months = parseInt(service.months);
                service.sessionsPerWeek = parseInt(service.sessionsPerWeek);
                service.startDate.setHours(0, 0, 0, 0);
                service.startTime = ServiceUtils.timeToMilitarFormat(vm.startTime.wickedpicker('time'));
                service.sessionsExtended = angular.copy(vm.sessions);
                service.sessionsExtended.forEach(session => { session.startTime = ServiceUtils.timeToMilitarFormat(session.startTime); });
                console.log(JSON.stringify(service));
            };

            $scope.$watch('vm.service', function (old, newd) {
                if (vm.service.daysOfWeek.filter(day => { return day; }).length === parseInt(vm.service.sessionsPerWeek)) {
                    vm.showSessions = false;
                    vm.sessions = [];
                    var numSessions = vm.service.months * 4 * vm.service.sessionsPerWeek;
                    var dayINeed = 1;
                    var dateInit;
                    if (moment().isoWeekday() <= dayINeed) {
                        dateInit = moment().isoWeekday(dayINeed);
                    } else {
                        dateInit = moment().add(1, 'weeks').isoWeekday(dayINeed);
                    }
                    var days = vm.service.daysOfWeek
                        .map((day, index) => { return day ? index + 1 : 0; })
                        .filter(day => { return day > 0; });

                    var j = 0;
                    for (var i = 0; i < numSessions; i++) {
                        var sessionDate = moment(dateInit).day(days[j]).week(dateInit.week()).startOf('day');
                        vm.sessions.push({
                            startDate: sessionDate.toDate(),
                            startTime: vm.startTime.wickedpicker('time'),
                            startDateToShow: sessionDate.format('LL'),
                            duration: 120,
                            dayOfWeek: days[j]
                        });
                        j++;
                        if (j === days.length) {
                            j = 0;
                            dateInit = moment(dateInit).add(1, 'weeks').isoWeekday(dayINeed);
                        }
                    }
                }
            }, true);

            $scope.$watch('vm.specificStep', () => {
                if (vm.specificStep === 2) {
                    vm.sessions = [];
                    for (var i = 0; i < vm.service.numSessions; i++) {
                        vm.sessions.push({
                            
                        });
                    }
                }
            });

            function initCtrl() {
                vm.specificStep = 1;
                vm.showSessions = false;
                vm.daysOfWeek = DAYS_OF_WEEK;
                vm.disable;
                vm.sessions = [];
                vm.today = ServiceUtils.getToday();
                vm.startTime = angular.element('#startTime').wickedpicker({ now: "12:00", minutesInterval: 30 });
                vm.service = {
                    type: 2,
                    numSessions: 0,
                    numStudents: 0,
                    months: 0,
                    sessionsPerWeek: 0,
                    startDate: new Date(),
                    description: '',
                    daysOfWeek: [false, false, false, false, false, false, false]
                };

            }

            initCtrl();
        });
})();