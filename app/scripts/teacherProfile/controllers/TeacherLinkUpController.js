(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherLinkUpController', function ($scope, $timeout, $cookies, ServiceTeachers) {
            var vm = this;

            /**
             * Search .docx curriculum from pc.
             */
            vm.searchFile = function () {
                $timeout(function () {
                    angular.element('#real-input-file').click();
                }, 0);
            };

            $scope.$watch('vm.fileContent', function () {
                var aux = angular.element(document.querySelector('#real-input-file'));
                if (angular.isDefined(aux) && angular.isDefined(aux.prop("files"))) {
                    var file = aux.prop("files")[0];
                    ServiceTeachers.uploadCurriculum(file, vm.teacher.id)
                        .then(function () {
                            vm.teacher.state = 1;
                        });
                }
            });

            function initCtrl() {
                vm.teacherId = $cookies.get('userId');
                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(function (response) {
                        vm.teacher = response.toJSON();
                        console.log(vm.teacher);
                    });
            }

            initCtrl();
        });
})();