(function () {
  'use strict';

  angular.module('routeModule')
    .controller('ViewRouteController', function ($scope, $cookies, $location, ServiceRoute, ServiceUtils) {
      var vm = this;

      /**
       * Search .csv file from pc.
       */
      vm.searchFile = function () {
        vm.realInputFile.click();
      };

      vm.cancelLoad = function () {
        vm.totalUnits = 0;
        vm.newPoints = [];
        vm.popup.close();
      };

      vm.loadAddress = function () {
        vm.route.points = vm.route.points.concat(vm.newPoints);
        vm.newPoints = [];
        vm.popup.close();
      };

      /**
       * Listen for changes in the selected file.
       */
      $scope.$watch('vm.fileContent', function (newValue) {
        if (angular.isDefined(newValue)) {
          loadData();
          vm.popup = new Foundation.Reveal($('#summary-load'));
          vm.popup.open();
        }
      });

      function loadData() {
        vm.totalUnits = 0;
        vm.newPoints = _.map(ServiceUtils.parseCSVFileToArray(vm.fileContent).slice(1), function (point) {
          vm.totalUnits += parseInt(point[1]);
          return {
            address: point[0],
            units: parseInt(point[1]),
            receiver: point[2],
            receiverPhone: point[3],
            comments: point[4]
          }
        });
        console.log(vm.newPoints);
      }

      function initCtrl() {

        vm.route = $cookies.getObject('selectedRoute');
        vm.newPoints = [];
        vm.realInputFile = angular.element('#real-input-file');

        if (angular.isDefined(vm.route)) {
          ServiceRoute.getRoute(vm.route.id)
            .then(function (response) {
              vm.route = response;
              console.log(vm.route);
            }, function (error) {
              console.log(error);
            });
        } else {
          $location.path('/dashboard');
        }

      }

      initCtrl();
    });
})();
