(function () {

  'use strict';

  angular.module('sessionModule')
    .factory('ServiceSession', function ($http) {
      return {
        login: function (email, password) {
          var req = {
            method: 'POST',
            url: 'http://localhost:1337/login',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              email: email,
              password: password
            }
          };

          return $http(req);
        }
      };
    });
})();
