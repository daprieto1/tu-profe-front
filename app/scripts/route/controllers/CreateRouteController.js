(function () {
  'use strict';

  angular.module('routeModule')
    .controller('CreateRouteController', function ($scope, $location, ServiceUtils, HOUR_INIT_TYPES, DELIVERY_TYPES, ROUTE_TYPES, VEHICLE_TYPES, CITIES) {
      var vm = this;

      /**
       * Search .csv file from pc.
       */
      vm.searchFile = function () {
        vm.realInputFile.click();
      };

      vm.cancelLoad = function () {
        vm.totalUnits = 0;
        vm.newRoute.points = [];
        vm.fileName = '';
        vm.popup.close();
      };

      vm.createRoute = function () {
        console.log(vm.newRoute);
        console.log(angular.toJson(vm.newRoute));
      };

      /**
       * Listen for changes in the selected file.
       */
      $scope.$watch('vm.fileContent', function (newValue) {
        if (angular.isDefined(newValue)) {
          var filename = vm.realInputFile.val();
          filename = filename.substring(filename.lastIndexOf('\\') + 1, filename.length);
          vm.fileName = filename;

          loadData();

          vm.popup = new Foundation.Reveal($('#summary-load'));
          vm.popup.open();
        } else {
          vm.fileName = '';
        }
      });

      function loadData() {
        vm.totalUnits = 0;
        vm.newRoute.points = _.map(ServiceUtils.parseCSVFileToArray(vm.fileContent).slice(1), function (point) {
          vm.totalUnits += parseInt(point[1]);
          return {
            address: point[0],
            units: parseInt(point[1]),
            receiver: point[2],
            receiverPhone: point[3],
            comments: point[4]
          }
        });
        console.log(vm.newRoute.points);
      }


      function initCtrl() {
        vm.step = 1;
        vm.cities = CITIES;
        vm.hourInitTypes = angular.copy(HOUR_INIT_TYPES);
        vm.deliveryTypes = angular.copy(DELIVERY_TYPES);
        vm.routeTypes = angular.copy(ROUTE_TYPES);
        vm.vehicleTypes = angular.copy(VEHICLE_TYPES);
        vm.newRoute = {
          points: []
        };

        vm.realInputFile = angular.element('#real-input-file');
        vm.maskInputFile = angular.element('#mask-input-file');

      }

      initCtrl();
    });
})();
