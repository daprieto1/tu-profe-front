(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentServiceHistoryController', function ($scope, AdvisoryServiceServices) {
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

                AdvisoryServiceServices.getAllByStudentId('c57df860-2ce8-489a-9e61-53577172a9fe')
                    .then(services=>{
                        vm.services = services.map(service => {
                            service.createdAt = moment(service.createdAt).format('LL');
                            service.sessions = service.sessions.map(session => {
                                session.startDateToShow = moment(session.startDate).format('LL');
                                session.numHours = session.duration / 60; 
                                return session;
                            });
                            return service;
                        });
                    });

            }

            initCtrl();
        });
})();