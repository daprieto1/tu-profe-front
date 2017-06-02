(function () {

    'use strict';
    angular.module('tuProfeApp')

        //.constant('TU_PROFE_API', 'https://tu-profe-api-node-diegoprieto.c9users.io:8080/api')
        .constant('TU_PROFE_API', 'http://localhost:8080/api')

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
        })

        .constant('NOTIFICATION_TYPES', [
            {
                id: 1,
                label: 'error',
                style: 'alert',
            },
            {
                id: 2,
                label: 'super',
                style: 'success',
            },
            {
                id: 3,
                label: 'alerta',
                style: 'warning',
            },
            {
                id: 4,
                label: 'información',
                style: '',
            },
            {
                id: 5,
                label: 'importante',
                style: 'primary',
            }
        ])

        .constant('DAYS_OF_WEEK', [
            {
                id: 0,
                label: 'Domingo'
            },
            {
                id: 1,
                label: 'Lunes'
            },
            {
                id: 2,
                label: 'Martes'
            },
            {
                id: 3,
                label: 'Miércoles'
            },
            {
                id: 4,
                label: 'Jueves'
            },
            {
                id: 5,
                label: 'Viernes'
            },
            {
                id: 6,
                label: 'Sábado'
            }
        ])

        .constant('ADVISORY_SERVICES_TYPE', [
            {
                id: 1,
                label: 'acompañamiento'
            },
            {
                id: 2,
                label: 'tema especifico'
            }
        ])

        .constant('SESSION_STATES', [
            {
                id: 0,
                label: 'Pendiente'
            }, {
                id: 1,
                label: 'En Proceso'
            }, {
                id: 2,
                label: 'Terminada'
            }, {
                id: 3,
                label: 'Congelada'
            }
        ]);
})();