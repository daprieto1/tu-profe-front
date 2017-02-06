(function () {
  'use strict';

  angular.module('tuProfeApp')
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
        },

        parseArrayToCSV: function (array) {
          var result = '';

          _.each(array, function (item) {
            result += (item + '\r\n');
          });

          return result;
        },

        downloadData: function (data, filename, extension) {
          var anchor = angular.element('<a/>');

          anchor.attr({
            href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
            target: '_blank',
            download: filename + '.' + extension
          })[0].click();
        }
      };
    });
})();
