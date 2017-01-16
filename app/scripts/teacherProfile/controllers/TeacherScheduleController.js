(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherScheduleController', function (ServiceTeachers) {
            var vm = this;

            vm.getScheduleTime = function (sectionId) {
                return vm.scheduleTimes[sectionId];
            };

            function initCtrl() {
                vm.scheduleTimes = [];
                for (var i = 6; i < 30; i++) {
                    vm.scheduleTimes.push(i + ':00');
                    vm.scheduleTimes.push(i + ':30');
                }
                ServiceTeachers.getTeacher('2896ca6d-fff5-457f-a542-707d90a91e29')
                    .then(function (response) {
                        vm.teacher = response.toJSON();
                        vm.schedule = vm.teacher.schedule.match(/.{1,7}/g).map(function (obj) {
                            return obj.split('').map(function (value) { return !!parseInt(value) });
                        });
                    });
            }

            initCtrl();
        });
})();