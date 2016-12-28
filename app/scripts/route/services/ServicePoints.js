(function() {
    'use strict';

    angular.module('routeModule')
        .factory('ServicePoints', function($resource, $rootScope, $http) {

            var Point = $resource('http://localhost:1337/point/:idPoint', { idRoute: '@idPoint' }, {
                bulkSave: {
                    method: 'POST',
                    url: $rootScope.routeApi + '/route/bulk-save/:idRoute',
                    isArray: true,
                    withCredentials: true
                },
                bulkDelete: {
                    method: 'POST',
                    url: $rootScope.routeApi + '/route/bulk-delete/:idRoute'
                }
            });

            return {
                bulkDelete: function(idRoute, points) {
                    return Point.bulkDelete({ idRoute: idRoute }, points).$promise;
                },
                bulkSave: function(idRoute, points) {
                    return Point.bulkSave({ idRoute: idRoute }, points).$promise;
                },
                readPointsFromFile: function(file) {
                    var fd = new FormData();
                    fd.append('file', file);
                    return $http.post($rootScope.routeApi + '/file/load-points', fd, {
                        contentType: false,
                        processData: false,
                        cache: false,
                        data: { file: file },
                        transformRequest: function() {
                            var formData = new FormData();
                            formData.append('file', file);
                            return formData;
                        },
                        headers: {
                            'Content-Type': undefined
                        }
                    });
                }
            }
        });
})();