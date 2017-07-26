(function () {
    'use strict';

    angular.module('sessionModule')
        .controller('ForgotPasswordController', function (ServiceSession) {
            var vm = this;

            vm.restorePassword = () => {
                vm.mailSended = true;

                ServiceSession.forgotPassword(vm.user);
            };

            function initCtrl() {
                vm.mailSended = false;
                vm.user = {
                    email: undefined,
                    userType: 'Teacher'
                };
            }

            initCtrl();
        });
})();