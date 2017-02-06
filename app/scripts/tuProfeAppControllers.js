(function () {
    'use strict';

    angular.module('tuProfeApp')
        .controller('HeaderController', function ($scope, $location) {
            var vm = this;

            vm.hideHeader = function () {
                var routes = ['teacher-profile'];
                var route = $location.absUrl();
                var hide = false;
                routes.forEach(function(routeItem){
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
                routes.forEach(function(routeItem){
                    if (route.indexOf(routeItem) !== -1) {
                        hide = true;
                    }
                });

                return hide;
            }
        });
})();