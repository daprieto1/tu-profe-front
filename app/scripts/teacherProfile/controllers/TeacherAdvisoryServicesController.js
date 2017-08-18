(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherAdvisoryServicesController', function ($scope, $cookies, $q, AdvisoryServiceServices, ServiceTeachers, AdvisorySessionServices, localStorageService, SESSION_STATES) {
            var vm = this;

            vm.updateSessionState = (session, newState) => {
                var sessionUpdate = angular.copy(session);
                sessionUpdate.state = newState;
                session.state = SESSION_STATES.find(state => state.id === newState);                

                AdvisorySessionServices.update(vm.selectedService.id, sessionUpdate.id, sessionUpdate)
                    .then(response => console.log(response))
                    .catch(err => console.log(err));
            };

            vm.takeService = (advisory) => {
                AdvisoryServiceServices.assign(advisory.id, vm.teacher.id)
                    .then(response => {
                        console.log(response);
                        alertify.success('Su solicitud ha sido enviada, se le notificará la decisión');
                    })
                    .catch(err => console.log(err));
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

                        vm.availableServices = vm.availableServices.map(advisory => {
                            advisory.pendingSessions = advisory.sessions.filter(session => { return session.state.id === 0; }).length;
                            return advisory;
                        });

                    })
                    .catch(err => console.log(err));

            }

            initCtrl();
        });
})();