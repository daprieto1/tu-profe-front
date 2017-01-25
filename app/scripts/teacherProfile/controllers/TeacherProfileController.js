(function() {
    angular.module('teacherProfileModule')
        .controller('TeacherProfileController', function($scope, $timeout, $route, $cookies, ServiceTeachers) {
            var vm = this;

            vm.editPhoto = function() {
                $timeout(function() {
                    angular.element('#real-input-photo-file').click();
                }, 0);
            };

            $scope.$watch('vm.photoFile', function() {
                var aux = angular.element(document.querySelector('#real-input-photo-file'));
                if (angular.isDefined(aux) && angular.isDefined(aux.prop("files")[0])) {
                    var file = aux.prop("files")[0];
                    ServiceTeachers.uploadPhoto(file, vm.teacher.id)
                        .then(function() {
                            $route.reload();
                        });
                }
            });

            function initCtrl() {
                vm.teacher = { id: $cookies.get('userId') };
                vm.photoFile = undefined;
                vm.section = 'trainings';
            }

            initCtrl();
        });
})();