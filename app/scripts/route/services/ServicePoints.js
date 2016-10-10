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
        },
        delete: {
          method: 'DELETE'
        }
      });

      return {
        deletePoint: function (idPont) {
          return Point.delete({idPoint: idPont}).$promise;
        },
        bulkSave: function (points) {
          return Point.bulkSave(points).$promise;
        }
      }
    });
})();
