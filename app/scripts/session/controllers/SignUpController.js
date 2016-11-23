(function() {
    'use strict';

    angular.module('sessionModule')
        .controller('SignUpController', function($scope, ServiceSession) {
            var vm = this;

            vm.signUp = function() {
                ServiceSession.signUp(vm.user)
                    .then(function(response) {
                        $location.path('/dashboard');
                    }, function(error) {
                        console.log(error);
                    });
            }

            function initCtrl() {
                vm.user = {};
            }

            initCtrl();
        });
})();