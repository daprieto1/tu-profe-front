(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherAdvisoryServicesController', function ($scope, $cookies, $q, AdvisoryServiceServices, ServiceTeachers, AdvisorySessionServices, localStorageService, SESSION_STATES) {
            var vm = this;

            vm.updateSessionState = (session, newState) => {
                var sessionUpdate = angular.copy(session);
                var lastState = angular.copy(session.state);
                sessionUpdate.state = newState;
                session.state = SESSION_STATES.find(state => state.id === newState);

                AdvisorySessionServices.update(vm.selectedService.id, sessionUpdate.id, sessionUpdate)
                    .then(response => alertify.success('Actualización de estado de sesión realizado con éxito.'))
                    .catch(err => {
                        session.state = lastState;
                        alertify.error('La actualización del estado de la asesoria no pudo ser realizada.');
                    });
            };

            vm.takeService = (advisory) => {
                AdvisoryServiceServices.assign(advisory.id, vm.teacher.id)
                    .then(response => {
                        alertify.success('Su solicitud ha sido enviada, se le notificará la decisión');
                    })
                    .catch(err => alertify.error('Su solicitud no ha sido enviada. ' + err.data));
            };

            vm.selectService = service => {
                if (vm.selectedService === service) {
                    vm.selectedService = undefined;
                } else {
                    vm.selectedService = service;
                }
            };

            function parseAdvisoryServices(advisories) {
                advisories.map(advisory => {
                    advisory.createdAtShow = moment(advisory.createdAt).format('MMMM Do YYYY, h:mm a');
                    advisory.startDateShow = moment(advisory.startDate).format('MMMM Do YYYY, h:mm a');
                    advisory.sessions = advisory.sessions.map(session => {
                        session.startDateToShow = moment(session.startDate).format('LL');
                        session.numHours = session.duration / 60;
                        session.state = SESSION_STATES.find(state => { return state.id === session.state; });
                        return session;
                    });
                    return advisory;
                });
                return advisories;
            }

            function parseFiles(files) {
                if (files) {
                    files = files.map(file => {
                        return {
                            name: file,
                            type: file.split('.').pop()
                        };
                    });
                }
                return files;
            }

            function initCtrl() {
                vm.tabAssigned = true;
                vm.teacherId = $cookies.get('userId');
                vm.teacher = localStorageService.get('teacher');
                console.log(vm.teacher);

                vm.teacher.advisoryServices.push(' ');
                var params = { id: { in: vm.teacher.advisoryServices } };

                $q.all([
                    AdvisoryServiceServices.filter(params),
                    AdvisoryServiceServices.getAvailableServices(vm.teacher.id)
                ])
                    .then(([assignedServices, availableServices]) => {
                        vm.assignedServices = parseAdvisoryServices(assignedServices);
                        vm.availableServices = parseAdvisoryServices(availableServices);

                        vm.assignedServices.forEach(advisory => {
                            advisory.files = parseFiles(advisory.files);
                        });
                        vm.availableServices = vm.availableServices.map(advisory => {
                            advisory.pendingSessions = advisory.sessions.filter(session => { return session.state.id === 0; }).length;
                            advisory.files = parseFiles(advisory.files);
                            return advisory;
                        });

                    })
                    .catch(err => console.log(err));

            }

            initCtrl();
        });
})();