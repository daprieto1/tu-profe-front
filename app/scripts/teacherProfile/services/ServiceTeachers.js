(function() {
    'use strict';

    angular.module('teacherProfileModule')
        .factory('ServiceTeachers', function($rootScope, $resource) {

            var Teacher = $resource($rootScope.routeApi + '/teacher/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                }
            })

            return {
                getTeacher: function(id) {
                    console.log('hp');
                    return Teacher.get({ id: id }).$promise;
                },

                update: function(teacher) {
                    return Teacher.update({}, teacher).$promise;
                }
            };
        });
})();