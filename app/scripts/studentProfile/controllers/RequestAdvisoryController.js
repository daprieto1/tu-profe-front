(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('RequestAdvisoryController', function ($scope) {
            var vm = this;

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
            }

            initCtrl();
        });
})();