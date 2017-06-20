(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherAdvisoryServicesController', function ($cookies, AdvisoryServiceServices, ServiceTeachers, SESSION_STATES) {
            var vm = this;

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

            function getAvailableServices() {
                var params = {
                    courseId: {
                        in: vm.teacher.courses
                    },
                    state: {
                        eq: 3
                    }
                }
                AdvisoryServiceServices.filter(params)
                    .then(advisories => {
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
                        vm.availableAdvisories = advisories;
                    });
            }

            function initCtrl() {
                vm.tabAvailable = true;
                vm.teacherId = $cookies.get('userId');
                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(teacher => {
                        vm.teacher = teacher;
                        getAvailableServices();
                    });
            }

            initCtrl();
        });
})();