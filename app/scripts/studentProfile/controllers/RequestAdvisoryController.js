(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('RequestAdvisoryController', function ($scope) {
            var vm = this;
            
            vm.addSession = () => {
              vm.sessions.push({});  
            };
            
            vm.deleteSession = index => {
                vm.sessions.splice(index,1);                
            };
            
            function initMap() {
                var address = { lat: 4.652657, lng: -74.063915 };
                vm.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 16,
                    center: address,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var marker = new google.maps.Marker({
                    position: address,
                    map: vm.map
                });
            }

            function initCtrl() {
                vm.numberStudentsSlider = {
                    value: 1,
                    options: {
                        floor: 1,
                        ceil: 3,
                        showTicks: true,
                        showTicksValues: true
                    }
                };
                
                vm.numberHoursSlider = {
                    value: 2,
                    options: {
                        floor: 2,
                        ceil: 8,
                        showTicks: true,
                        showTicksValues: true
                    }
                };
                
                vm.sessions = [{}];
                
                initMap();
            }

            initCtrl();
        });
})();