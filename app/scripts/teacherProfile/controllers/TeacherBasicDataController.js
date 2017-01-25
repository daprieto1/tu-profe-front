(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherBasicDataController', function ($scope, $cookies, ServiceTeachers) {
            var vm = this;

            vm.edit = function (section) {
                ServiceTeachers.update(vm.teacher)
                    .then(function () {
                        section = false;
                        console.log(section);
                        console.log(vm.editData);
                    });
            };

            function initCtrl() {
                vm.teacherId = $cookies.get('userId');
                vm.editData = {
                    account: false,
                    personal: false,
                    academical: false,
                    financial: false
                }

                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(function (response) {
                        vm.teacher = response.toJSON();
                    });
            }

            initCtrl();
        });
})();