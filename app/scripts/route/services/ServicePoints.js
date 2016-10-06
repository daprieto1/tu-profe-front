(function () {
  'use strict';

  angular.module('routeModule')
    .factory('ServicePoints', function ($resource) {

      var Point = $resource('http://localhost:1337/point/:idPoint', {idRoute: '@idPoint'}, {
        bulkSave: {
          method: 'POST',
          url: 'http://localhost:8080/point/bulk-save',
          isArray: true,
          withCredentials: true
        }
      });

      return {
        bulkSave: function (points) {
          return Point.bulkSave(points).$promise;
        }
      }
    });
})();
