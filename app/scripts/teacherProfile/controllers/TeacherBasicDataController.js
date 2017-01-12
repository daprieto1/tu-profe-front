(function() {
    angular.module('teacherProfileModule')
        .controller('TeacherBasicDataController', function() {
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