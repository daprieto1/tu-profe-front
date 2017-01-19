(function() {

    'use strict';

    angular.module('sessionModule')

    .controller('LoginController', function($scope, $rootScope, $location, $cookies, ServiceSession) {

        var vm = this;

        vm.login = function() {
            ServiceSession.login(vm.email, vm.password)
                .then(function(response) {
                    $cookies.putObject('user', response);
                    $cookies.put('username', vm.email);
                    $cookies.put('token', vm.password);
                    $rootScope.user = response;
                    $location.path('dashboard');
                }, function(error) {
                    console.log(error);
                });
        };

        function initCtrl() {
            vm.isTeacher = false;
            vm.isStudent = false;
            vm.email = undefined;
            vm.password = undefined;
        }

        initCtrl();
    });
})();