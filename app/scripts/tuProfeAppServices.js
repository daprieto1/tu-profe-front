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
        },

        getToday: () => {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth() + 1; //January is 0!
          var yyyy = today.getFullYear();
          if (dd < 10) {
            dd = '0' + dd
          }
          if (mm < 10) {
            mm = '0' + mm
          }

          today = yyyy + '-' + mm + '-' + dd;
          return today;
        },

        timeToMilitarFormat: time => {
          console.log(time);
          var result = time
            .replace(/ /g,'')
            .replace('AM', '')
            .replace('PM', '')
            .split(':');
          
          if (time.includes('PM') && result[0] !== '12') {
            result[0] = (parseInt(result[0]) + 12) + '';
          } else if (time.includes('AM') && result[0] === '12') {
            result[0] = '00';
          }

          return result.join(':');
        }
      };
    });
})();
