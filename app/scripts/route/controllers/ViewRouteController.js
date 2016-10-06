(function () {
  'use strict';

  angular.module('routeModule')
    .controller('ViewRouteController', function ($scope, $cookies, $location, ServiceRoute, ServicePoints, ServiceUtils, CITIES) {
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
        vm.fileContent = undefined;
        vm.popup.close();
      };

      vm.loadAddress = function () {

        vm.popup.close();

        ServicePoints.bulkSave(vm.newPoints)
          .then(function (response) {
            console.log(response);
            vm.route.points = vm.route.points.concat(vm.newPoints);
            vm.newPoints = [];
          }, function (error) {
            console.log(error);
          });

        vm.fileContent = undefined;

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
            comments: point[4],
            city: vm.route.city.internalName,
            route: vm.route.id
          }
        });
        console.log(vm.newPoints);
      }

      function initCtrl() {

        vm.route = $cookies.getObject('selectedRoute');
        vm.newPoints = [];
        vm.realInputFile = angular.element('#real-input-file');
        vm.fileContent = undefined;

        if (angular.isDefined(vm.route)) {
          ServiceRoute.getRoute(vm.route.id)
            .then(function (response) {
              vm.route = response;
              vm.route.city = _.find(CITIES, function (city) {
                return city.id = vm.route.city;
              });

              var result = _.groupBy(vm.route.points, function (point) {
                return angular.isDefined(point.coordinate);
              });

              vm.geolocalized = result.true;
              vm.noGeolocalized = result.false;

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
