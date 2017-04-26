(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('ProfileController', function ($scope) {
            var vm = this;

            function initCtrl() {
                vm.editData = false;
            }

            initCtrl();
        });
})();