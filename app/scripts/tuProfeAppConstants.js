(function () {

    'use strict';
    angular.module('tuProfeApp')

        .constant('TU_PROFE_API', 'https://tu-profe-api-node-diegoprieto.c9users.io:8080/api')

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