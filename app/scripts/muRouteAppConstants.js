(function() {

    'use strict';

    angular.module('muRouteApp')

    .constant('HOUR_INIT_TYPES', [{
            id: 1,
            name: 'Mañana'
        },
        {
            id: 2,
            name: 'Tarde'
        }
    ])

    .constant('DELIVERY_TYPES', [{
            id: 1,
            name: 'Generica'
        },
        {
            id: 2,
            name: 'Personalizada'
        }
    ])

    .constant('ROUTE_TYPES', [{
            id: 1,
            name: 'Entregas'
        },
        {
            id: 4,
            name: 'Recogida'
        },
        {
            id: 3,
            name: 'Recaudo'
        }
    ])

    .constant('VEHICLE_TYPES', [{
        id: 1,
        name: 'Moto',
        height: 50,
        width: 50,
        deep: 50,
        weight: 50,
        minCapacity: 20,
        maxCapacity: 25,
        collection: 2000000
    }])

    .constant('CITIES', [{
            id: 1,
            name: 'Bogotá',
            internalName: 'bogota',
            lat: 4.637292,
            log: -74.088665
        },
        {
            id: 2,
            name: 'Cali',
            internalName: 'cali',
            lat: 3.431117,
            log: -76.502182
        },
        {
            id: 4,
            name: 'Barranquilla',
            internalName: 'barranquilla',
            lat: 10.972697,
            log: -74.795767
        }
    ])

    .constant('POINT_STATES', [{
            id: 1,
            name: 'No Geolocalized'
        },
        {
            id: 2,
            name: 'Geolocalized'
        }
    ]);
})();