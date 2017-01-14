(function() {
    'use strict';

    angular.module('sessionModule')
        .controller('TeacherSignUpController', function(ServiceSession) {
            var vm = this;

            vm.signUp = function() {
                ServiceSession.signUpTeacher(vm.teacher)
                    .then(function(resource) {
                        console.log(resource);
                    }, function(error) {
                        console.log(error);
                    });
            }

            function initCtrl() {
                vm.teacher = {}
            }

            initCtrl();
        });
})();