(function () {
  'use strict';

  angular.module('muRouteApp')
    .factory('ServiceUtils', function () {
      return {
        /**
         * Parse a file in CSV format to a matrix with the information.
         * @param file
         * @returns {Array}
         */
        parseCSVFileToArray: function (file) {
          var records = [];

          _.each(file.split('\n'), function (line) {
            records.push(line.split(','));
          });

          return records;
        }
      };
    });
})();
