(function () {
    'use strict';

    angular.module('sessionModule')
        .controller('StudentSignUpController', function ($rootScope, $location, ServiceSession) {
            var vm = this;

            vm.signUp = function () {
                console.log(vm.student);
                ServiceSession.signUpStudent(vm.student)
                    .then(function (resource) {                        
                        $rootScope.loginStudent(vm.student.email, vm.student.password);
                    }, function (error) {
                        console.log(error);
                    });
            }

            function initCtrl() {
                vm.student = {};
            }

            initCtrl();
        });
})();