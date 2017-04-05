(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherProfileController', function ($scope, $timeout, $route, $cookies, $rootScope, ServiceTeachers, TEACHER_STATES) {
            var vm = this;

            vm.logout = function () {
                alertify.set({ buttonReverse: true });
                alertify.confirm('¿Seguro deseas cerrar sesión?', function (e) {
                    if (e) {
                        $rootScope.logout();
                    }
                });
            };

            vm.menuLiClass = function (name) {
                return vm.section === name ? 'selected' : '';
            };

            vm.showMenuLi = function () {
                if (TEACHER_STATES.inactive.id <= vm.teacher.state && vm.teacher.state <= TEACHER_STATES.active.id) {
                    return true;
                } else {
                    return false;
                }
            };

            vm.editPhoto = function () {
                $timeout(function () {
                    angular.element('#real-input-photo-file').click();
                }, 0);
            };

            $scope.$watch('vm.photoFile', function () {
                var aux = angular.element(document.querySelector('#real-input-photo-file'));
                if (angular.isDefined(aux) && angular.isDefined(aux.prop('files')[0])) {
                    var file = aux.prop('files')[0];
                    ServiceTeachers.uploadPhoto(file, vm.teacher.id)
                        .then(function () {
                            $route.reload();
                        });
                }
            });

            function initCtrl() {
                vm.teacherId = $cookies.get('userId');
                console.log(vm.teacherId);
                vm.teacher = {};
                vm.photoFile = undefined;
                vm.section = 'linkUp';

                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(function (response) {
                        vm.teacher = response.toJSON();
                        $scope.teacher = vm.teacher;
                    });
            }

            initCtrl();
        });
})();