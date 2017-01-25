(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherScheduleController', function ($scope, $cookies, ServiceTeachers) {
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

            function initCtrl() {

                vm.teacherId = $cookies.get('userId');
                vm.scheduleTimes = [];
                for (var i = 6; i < 30; i++) {
                    vm.scheduleTimes.push(i + ':00');
                    vm.scheduleTimes.push(i + ':30');
                }
                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(function (response) {
                        vm.teacher = response;
                        vm.schedule = vm.teacher.schedule.match(/.{1,7}/g).map(function (obj) {
                            return obj.split('').map(function (value) { return !!parseInt(value) });
                        });
                    });
            }

            initCtrl();
        });
})();