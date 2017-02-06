(function () {

    'use strict';

    angular.module('tuProfeApp')

        .constant('TU_PROFE_API', 'http://localhost:8080')

        .constant('TEACHER_STATES', {
            signUp: {
                id: 0
            }, curriculum: {
                id: 1
            }, interview: {
                id: 2
            }, inactive: {
                id: 3
            }, active: {
                id: 4
            }, rejected: {
                id: 5
            }
        });
})();