(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherProfileController', function (ServiceTeachers) {
            var vm = this;

            function initCtrl() {
                vm.section = 'schedule';                
            }

            initCtrl();
        });
})();