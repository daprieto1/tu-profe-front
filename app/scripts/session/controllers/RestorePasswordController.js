(function () {
    'use strict';

    angular.module('sessionModule')
        .controller('RestorePasswordController', function ($location, ServiceSession) {
            var vm = this;

            vm.restorePassword = () => {
                var data = {
                    userType: vm.params.userType,
                    nonce: vm.params.nonce,
                    password: vm.password
                };
                ServiceSession.restorePassword(data)
                    .then(() => { vm.restored = true; })
                    .catch(err => alertify.error('La contraseña no pudo ser restaurada. Comuníquese con el administrador.'));
            };

            function initCtrl() {
                vm.restored = false;
                vm.password = undefined;
                vm.passwordConfirm = undefined;
                vm.params = $location.search();

                if (angular.isUndefined(vm.params) || angular.isUndefined(vm.params.nonce) || angular.isUndefined(vm.params.userType)) {
                    $location.path('login');
                }
            }

            initCtrl();
        });
})();