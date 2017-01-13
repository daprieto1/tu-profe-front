(function() {
    angular.module('teacherProfileModule')
        .controller('TeacherProfileController', function() {
            var vm = this;

            function initCtrl() {
                vm.section = 'basicData';
            }

            initCtrl();
        });
})();