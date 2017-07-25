(function () {
    'use strict';

    angular.module('sessionModule')
        .controller('RestorePasswordController', function () {
            var vm = this;

            vm.restorePassword = () => {
                vm.restored = true;
            };

            function initCtrl() {
                vm.restored = false;
                vm.password = false;
                vm.passwordConfirm = undefined;
            }

            initCtrl();
        });
})();