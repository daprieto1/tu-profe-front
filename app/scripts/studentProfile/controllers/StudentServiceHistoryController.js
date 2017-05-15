(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentServiceHistoryController', function ($scope, AdvisoryServiceServices) {
            var vm = this;

            vm.selectService = service => {
                console.log('here');
                console.log(vm.selectedService, service, vm.selectedService === service);
                if (vm.selectedService === service) {
                    vm.selectedService = undefined;
                } else {
                    vm.selectedService = service;
                }
            };

            function initCtrl() {
                vm.selectedService = undefined;
                vm.services = [];
                AdvisoryServiceServices.getAllByStudentId()
                    .then(services => {
                        vm.services = services;
                    });                
            }

            initCtrl();
        });
})();