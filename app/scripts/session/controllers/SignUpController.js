(function() {
    'use strict';

    angular.module('sessionModule')
        .controller('SignUpController', function($scope,ServiceSession) {
            var vm = this;

            vm.signUp = function() {
                console.log(vm.user);
                ServiceSession.signUp(vm.user)
                    .then(function(response){
                        console.log(response);
                    },function(error){
                        console.log(error);
                    });
            }

            function initCtrl() {
                vm.user = {};
            }

            initCtrl();
        });
})();