(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentProfileController', function ($scope, $rootScope, $location, $cookies) {
            var vm = this;
            
            vm.logout = function () {
                $rootScope.logout();
            };

            function initCtrl() {
                vm.section = 'request-advisory';
                if($cookies.get('userId') === undefined){
                    $location.path('/login');
                }
            }

            initCtrl();
        });
})();