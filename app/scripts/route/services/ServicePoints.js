(function () {
  'use strict';

  angular.module('routeModule')
    .factory('ServicePoints', function ($resource) {

      var Point = $resource('http://localhost:1337/point/:idPoint', { idRoute: '@idPoint' }, {
        bulkSave: {
          method: 'POST',
          url: 'http://localhost:8080/route/bulk-save/:idRoute',
          isArray: true,
          withCredentials: true
        },
        bulkDelete: {
          method: 'POST',
          url: 'http://localhost:1337/point/bulk-delete'
        }
      });

      return {
        bulkDelete: function (points) {
          return Point.bulkDelete(points).$promise;
        },
        bulkSave: function (idRoute, points) {
          return Point.bulkSave({ idRoute: idRoute }, points).$promise;
        }
      }
    });
})();
