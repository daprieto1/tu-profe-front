(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('ProfileController', function ($scope, $timeout, $route, $cookies, ServiceStudents) {
            var vm = this;

            vm.edit = () => {
                var student = angular.copy(vm.student);
                ServiceStudents.update(student)
                    .then(function () {
                        vm.editData = false;
                        alertify.success('Tus datos han sido actualizados');
                    });
            };

            vm.selectPhoto = () => {
                $timeout(() => {
                    angular.element('#real-input-photo-file').click();
                }, 0);
            };

            vm.uploadPhoto = () => {
                ServiceStudents.uploadPhoto(file, vm.teacher.id)
                    .then(function () {
                        $route.reload();
                    });
            };

            $scope.$watch('vm.photoFile', () => {                
                var aux = angular.element(document.querySelector('#real-input-photo-file'));
                if (angular.isDefined(aux) && angular.isDefined(aux.prop('files')[0])) {
                    var file = aux.prop('files')[0];
                }
            });

            function initCtrl() {
                vm.editData = false;
                vm.editPhoto = false;
                vm.photoFile = undefined;

                ServiceStudents.getStudent($cookies.get('userId'))
                    .then(student => {
                        vm.student = student;
                    })
                    .catch(err => {
                        console.log('err');
                    });
            }

            initCtrl();
        });
})();