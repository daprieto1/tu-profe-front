(function () {
    'use strict';

    angular.module('sessionModule')
        .controller('TeacherSignUpController', function ($rootScope, $location, ServiceSession) {
            var vm = this;

            vm.signUp = function () {
                ServiceSession.signUpTeacher(vm.teacher)
                    .then(function (resource) {
                        console.log(resource);
                        $rootScope.loginTeacher(vm.teacher.email, vm.teacher.password);
                    }, function (error) {
                        vm.error = error.data;
                        vm.showError = true;
                    });
            }

            function initCtrl() {
                vm.teacher = {};
            }

            initCtrl();
        });
})();