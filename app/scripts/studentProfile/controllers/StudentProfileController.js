(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentProfileController', function ($scope, $rootScope, $location, $cookies) {
            var vm = this;
            
            vm.logout = function () {
                $rootScope.logout();
            };

            function initCtrl() {
                vm.section = 'service-history';
                if($cookies.get('userId') === undefined){
                    $location.path('/login');
                }
            }

            initCtrl();
        });
})();