(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherLinkUpController', function ($scope, $timeout, $cookies, ServiceTeachers, TEACHER_STATES) {
            var vm = this;

            /**
             * Search .docx curriculum from pc.
             */
            vm.searchFile = function () {
                $timeout(function () {
                    angular.element('#real-input-file').click();
                }, 0);
            };

            vm.activateAccount = function () {
                var message = '¿Seguro deseas activar tu cuenta?.<br/><br/>Recuerda que debes haber realizado las siguientes acciones:<ul><li>Aceptar las reglas de juego</li><li>Completar tu información personal</li><li>Seleccionar las materias que vas a dictar</li><li>Configurar tu horario</li><li>Pasar el examen de vinculación</li></ul>';
                alertify.confirm(message, function (e) {
                    if (e) {
                        ServiceTeachers.activateAccount(vm.teacherId)
                            .then(function () {
                                alertify.success('Tu cuenta ahora está activa');
                                vm.teacher.state = TEACHER_STATES.active.id;
                            }, function (error) {
                                alertify.log('No ha sido posible activar tu cuenta: ' + error.data.message, 'error', 0);
                            });
                    }
                });
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
                    });
            }

            initCtrl();
        });
})();