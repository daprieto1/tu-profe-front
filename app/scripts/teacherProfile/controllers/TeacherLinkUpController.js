(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherLinkUpController', function ($scope, $timeout, $cookies, $modal, ServiceTeachers, TEACHER_STATES) {
            var vm = this;

            /**
             * Search .docx curriculum from pc.
             */
            vm.searchFile = function () {
                $timeout(function () {
                    angular.element('#real-input-file').click();
                }, 0);
            };

            /**
             * Activate account.
             * The process is successful if the teacher accomplish all the restrictions.
             */
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

            vm.openSelectInterviewModal = function () {
                var params = {
                    templateUrl: 'views/teacherProfile/modals/selectInterviewModal.html',
                    resolve: {
                        teacherId: function () {
                            return vm.teacher.id;
                        },
                    },
                    controller: function ($scope, $modalInstance, teacherId, InterviewServices) {
                        $scope.teacherId = teacherId;
                        InterviewServices.getAllActive()
                            .then(function (interviewsResponse) {
                                $scope.interviews = interviewsResponse;
                                $scope.interviews.forEach(function (interview) {
                                    interview.momentDate = moment(interview.startDateTime).format('LLL');
                                });
                            });

                        $scope.takePlace = function (interviewId) {
                            InterviewServices.takePlace($scope.teacherId, interviewId)
                                .then(function () {
                                    alertify.success('La entrevista ha sido agendada con éxito.');
                                    $modalInstance.close();
                                }, function (error) {
                                    alertify.error('La entrevista no ha podido ser agendada: ' + error.data.message);
                                });
                        };

                    }
                };
                var modalInstance = $modal.open(params);
                modalInstance.result.then(function (selectedItem) {
                    vm.teacher.state = TEACHER_STATES.interview.id;
                }, function () {
                    alertify.error('Recuerda agendar tu entrevista pronto, los cupos no son ilimitados');
                });
            };

            $scope.$watch('vm.fileContent', function () {
                var aux = angular.element(document.querySelector('#real-input-file'));
                if (angular.isDefined(aux) && angular.isDefined(aux.prop('files'))) {
                    var file = aux.prop('files')[0];
                    ServiceTeachers.uploadCurriculum(file, vm.teacher.id)
                        .then(function () {
                            vm.teacher.state = 1;
                        });
                }
            });

            function initCtrl() {
                vm.teacherId = $cookies.get('userId');
                vm.teacherId = '6774e98a-fe53-4ae3-940d-bc9734b6197f';
                vm.interviews = [];

                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(function (teacherResponse) {
                        vm.teacher = teacherResponse.toJSON();
                    });
            }

            initCtrl();
        });
})();