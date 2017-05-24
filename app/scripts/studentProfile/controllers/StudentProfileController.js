(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentProfileController', function ($scope, $rootScope, $location, $cookies) {
            var vm = this;
            
            vm.logout = function () {
                alertify.set({ buttonReverse: true });
                alertify.confirm('¿Seguro deseas cerrar sesión?', function (e) {
                    if (e) {
                        $rootScope.logout();
                    }
                });
            };

            function initCtrl() {
                vm.section = 'request-service';
                if($cookies.get('userId') === undefined){
                    $location.path('/login');
                }
            }

            initCtrl();
        });
})();