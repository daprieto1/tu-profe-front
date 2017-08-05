(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('ProfileController', function ($scope, $timeout, $route, $cookies, ServiceStudents, envService, PROFILE_PHOTO) {
            var vm = this;

            vm.edit = () => {
                var student = angular.copy(vm.studentEdit);
                ServiceStudents.update(student)
                    .then(function () {
                        vm.editData = false;
                        vm.student = vm.studentEdit;
                        vm.studentEdit = angular.copy(vm.student);
                        alertify.success('Tus datos han sido actualizados');
                    });
            };

            vm.selectPhoto = () => {
                $timeout(() => {
                    angular.element('#real-input-profile-photo-file').click();
                }, 0);
            };

            vm.uploadPhoto = () => {
                ServiceStudents.uploadPhoto(vm.file, vm.student.id)
                    .then(function () {
                        $route.reload();
                    })
                    .catch(err => console.log(err));
            };

            $scope.$watch('vm.photoFile', (newValue, oldValue) => {
                var aux = angular.element(document.querySelector('#real-input-profile-photo-file'));
                if (angular.isDefined(aux) && angular.isDefined(aux.prop('files'))) {
                    vm.file = aux.prop('files')[0];
                }
            });

            function initCtrl() {
                vm.editData = false;
                vm.editPhoto = false;

                ServiceStudents.getStudent($cookies.get('userId'))
                    .then(student => {                        
                        vm.student = student;
                        vm.studentEdit = angular.copy(student);
                        vm.profilePhotoUrl = envService.read('CloudFrontTuProfe') + PROFILE_PHOTO + student.id + '.png';                        
                        console.log(vm.profilePhotoUrl);
                    })
                    .catch(err => {
                        console.log('err');
                    });
            }

            initCtrl();
        });
})();