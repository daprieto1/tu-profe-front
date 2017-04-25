(function () {
    'use strict';

    angular.module('tuProfeApp')
        .controller('HeaderController', function ($scope, $location) {
            var vm = this;

            vm.hideHeader = function () {
                var routes = ['teacher-profile'];
                var route = $location.absUrl();
                var hide = false;
                routes.forEach(function (routeItem) {
                    if (route.indexOf(routeItem) !== -1) {
                        hide = true;
                    }
                });

                return hide;
            }
        })

        .controller('FooterController', function ($location) {
            var vm = this;

            vm.hideFooter = function () {
                var routes = ['teacher-profile'];
                var route = $location.absUrl();
                var hide = false;
                routes.forEach(function (routeItem) {
                    if (route.indexOf(routeItem) !== -1) {
                        hide = true;
                    }
                });

                return hide;
            }
        })

        .controller('PriceQuoteController', function ($scope, $q, AdvisoryServiceServices) {
            var vm = this;

            $scope.$watch('[vm.numberStudentsSlider.value,vm.numberHoursSlider.value]', () => {   
                vm.showPrices = false;             
                var advisoryService = {
                    numberStudents: vm.numberStudentsSlider.value,
                    numberHours: vm.numberHoursSlider.value,
                    course: {}
                }
                vm.advisoryServices[0] = angular.copy(advisoryService);
                vm.advisoryServices[1] = angular.copy(advisoryService);
                vm.advisoryServices[2] = angular.copy(advisoryService);

                vm.advisoryServices[0].course.classification = 1;
                vm.advisoryServices[1].course.classification = 2;
                vm.advisoryServices[2].course.classification = 3;

                $q.all([
                    AdvisoryServiceServices.calculate(vm.advisoryServices[0]),
                    AdvisoryServiceServices.calculate(vm.advisoryServices[1]),
                    AdvisoryServiceServices.calculate(vm.advisoryServices[2])
                ])
                    .then(data => {                        
                        vm.advisoryServices = data;          
                        vm.showPrices = true;            
                    });
            }, true);

            function initCtrl() {
                vm.numberStudentsSlider = {
                    value: 1,
                    options: {
                        floor: 1,
                        ceil: 4,
                        showTicks: true,
                        showTicksValues: true
                    }
                };

                vm.numberHoursSlider = {
                    value: 3,
                    options: {
                        floor: 2,
                        ceil: 5,
                        showTicks: true,
                        showTicksValues: true
                    }
                };

                vm.showPrices = false;
                vm.advisoryServices = [{}, {}, {}];
            }

            initCtrl();
            vm.priceSlider = 10;

        });
})();