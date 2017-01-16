(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherBasicDataController', function (ServiceTeachers) {
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
                vm.editData = {
                    account: false,
                    personal: false,
                    academical: false,
                    financial: false
                }

                ServiceTeachers.getTeacher('2896ca6d-fff5-457f-a542-707d90a91e29')
                    .then(function (response) {
                        vm.teacher = response.toJSON();
                    });
            }

            initCtrl();
        });
})();