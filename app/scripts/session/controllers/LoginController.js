(function () {

    'use strict';

    angular.module('sessionModule')

        .controller('LoginController', function ($scope, $rootScope, $location, $cookies, ServiceSession) {

            var vm = this;

            vm.login = function () {
                if (vm.isTeacher) {
                    $rootScope.loginTeacher(vm.email, vm.password)
                        .then(function () { }, function () {
                            vm.showError = true;
                        });
                } else if (vm.isStudent) {
                    $rootScope.loginStudent(vm.email, vm.password)
                        .then(token => console.log(token), function () {
                            vm.showError = true;
                        });
                }
            };

            function initCtrl() {
                vm.showError = false;
                vm.isTeacher = false;
                vm.isStudent = false;
                vm.email = undefined;
                vm.password = undefined;
            }

            initCtrl();
        });
})();