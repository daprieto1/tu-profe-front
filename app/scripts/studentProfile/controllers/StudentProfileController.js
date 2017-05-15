(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentProfileController', function ($scope) {
            var vm = this;

            function initCtrl() {
                vm.section = 'notifications';
            }

            initCtrl();
        });
})();