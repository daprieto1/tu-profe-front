(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherAdvisoryServicesController', function () {
            var vm = this;

            function initCtrl() {
                vm.tabAvailable = true;
            }

            initCtrl();
        });
})();