(function () {
    'use strict';

    angular.module('sessionModule')
        .controller('ForgotPasswordController', function () {
            var vm = this;

            vm.restorePassword = () => {
                vm.mailSended = true;
            };

            function initCtrl() {
                vm.mailSended = false;
                vm.email = undefined;
            }

            initCtrl();
        });
})();