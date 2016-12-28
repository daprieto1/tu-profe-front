(function() {
    'use strict';
    angular.module('routeModule', [])

    .config(function($routeProvider) {
        $routeProvider
            .when('/route/create', {
                templateUrl: 'views/route/create.html'
            })
            .when('/route/view', {
                templateUrl: 'views/route/view.html'
            })
            .when('/route/view-solution', {
                templateUrl: 'views/route/viewSolution.html'
            })
            .when('/route/edit', {
                templateUrl: 'views/route/edit.html'
            })
    })

    .run(function($rootScope) {
        var stopPointPickUp = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: 'images/map/ic-pin-recogida.png'
            }))
        });

        var stopPointIntermediate = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: 'images/map/ic-pin-intermedia.png'
            }))
        });

        var stopPointFinal = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: 'images/map/ic-pin-final.png'
            }))
        });

        $rootScope.getMarkersStyles = function() {
            var markersStyles = {
                stopPointPickUp: stopPointPickUp,
                stopPointIntermediate: stopPointIntermediate,
                stopPointFinal: stopPointFinal
            };

            return markersStyles;
        };

        $rootScope.printAddressMarkers = function(points, map, vectorSource) {
            var markersStyles = $rootScope.getMarkersStyles();
            map.getView().setCenter(ol.proj.transform([points[0].coordinate.longitude, points[0].coordinate.latitude], 'EPSG:4326', 'EPSG:3857'));
            _.each(points, function(point, index) {
                var feature = new ol.Feature({});
                var location = ol.proj.transform([point.coordinate.longitude, point.coordinate.latitude], 'EPSG:4326', 'EPSG:3857');
                feature.setGeometry(new ol.geom.Point(location));

                if (index === 0) {
                    feature.setStyle(markersStyles.stopPointPickUp);
                } else if (index === points.length - 1) {
                    feature.setStyle(markersStyles.stopPointFinal);
                } else {
                    feature.setStyle(markersStyles.stopPointIntermediate);
                }

                vectorSource.addFeature(feature);
            });
        };
    });
})();