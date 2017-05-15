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
                AdvisoryServiceServices.getBySudent('1')
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