(function () {
    'use strict';

    angular.module('studentProfileModule')
        .controller('RequestAdvisoryController', function ($scope, ServiceUtils, DAYS_OF_WEEK) {
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
                            startTime: '123',
                            startDateToShow: sessionDate.format('LL')
                        });
                        j++;
                        if (j === days.length) {
                            j = 0;
                            dateInit = moment(dateInit).add(1, 'weeks').isoWeekday(dayINeed);
                        }
                    }
                }
            }, true);

            function initCtrl() {
                vm.showSessions = false;
                vm.daysOfWeek = DAYS_OF_WEEK;
                vm.disable;
                vm.sessions = [];
                vm.today = ServiceUtils.getToday();
                vm.startTime = angular.element('#startTime').wickedpicker({now: "12:00",minutesInterval: 30}),
                vm.service = {
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