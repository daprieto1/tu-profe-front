(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentServiceHistoryController', function ($scope, $cookies, AdvisoryServiceServices, SESSION_STATES) {
            var vm = this;

            vm.selectService = service => {                             
                if (vm.selectedService === service) {
                    vm.selectedService = undefined;
                } else {
                    vm.selectedService = service;
                }
            };

            function initCtrl() {
                vm.selectedService = undefined;

                AdvisoryServiceServices.getAllByStudentId($cookies.get('userId'))
                    .then(services=>{
                        vm.services = services.map(service => {
                            service.createdAt = moment(service.createdAt).format('LL');
                            service.sessions = service.sessions.map(session => {
                                session.startDateToShow = moment(session.startDate).format('LL');
                                session.numHours = session.duration / 60; 
                                session.state = SESSION_STATES.find(state => {
                                   return state.id === session.state;
                                });
                                return session;
                            });
                            return service;
                        });
                    });

            }

            initCtrl();
        });
})();