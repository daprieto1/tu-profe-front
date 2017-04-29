(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentServiceHistoryController', function ($scope) {
            var vm = this;

            vm.selectService = service => {        
                console.log('here');
                console.log(vm.selectedService , service,vm.selectedService === service);                        
                if (vm.selectedService === service) {
                    vm.selectedService = undefined;
                } else {
                    vm.selectedService = service;
                }
            };

            function initCtrl() {
                vm.selectedService = undefined;
                vm.services = [{
                    date: '19/03/2017',
                    teacher: 'Fidel Olarte',
                    numStudents: '3',
                    numHours: '3',
                    city: 'Bogotá',
                    cost: '45.000',
                    sessions: [
                        {
                            date: '19/03/2017',
                            time: '23:00',
                            numHours: '3',
                            teacher: 'Fidel Olarte'
                        },
                        {
                            date: '19/03/2017',
                            time: '23:00',
                            numHours: '3',
                            teacher: 'Fidel Olarte'
                        },
                        {
                            date: '19/03/2017',
                            time: '23:00',
                            numHours: '3',
                            teacher: 'Fidel Olarte'
                        }
                    ]
                },
                {
                    date: '19/03/2017',
                    teacher: 'Fidel Olarte',
                    numStudents: '3',
                    numHours: '3',
                    city: 'Bogotá',
                    cost: '45.000',
                    sessions: [
                        {
                            date: '19/03/2017',
                            time: '23:00',
                            numHours: '3',
                            teacher: 'Fidel Olarte'
                        },
                        {
                            date: '19/03/2017',
                            time: '23:00',
                            numHours: '3',
                            teacher: 'Fidel Olarte'
                        },
                        {
                            date: '19/03/2017',
                            time: '23:00',
                            numHours: '3',
                            teacher: 'Fidel Olarte'
                        }
                    ]
                }
                ];
            }

            initCtrl();
        });
})();