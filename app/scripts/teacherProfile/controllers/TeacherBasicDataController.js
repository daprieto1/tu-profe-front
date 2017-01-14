(function() {
    angular.module('teacherProfileModule')
        .controller('TeacherBasicDataController', function(ServiceTeachers) {
            var vm = this;

            function initCtrl() {
                vm.editData = {
                    account: false,
                    personal: false,
                    academical: false,
                    financial: false
                }
            }

            initCtrl();
        });
})();