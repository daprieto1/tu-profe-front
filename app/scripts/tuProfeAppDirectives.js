(function () {
    'use strict';

    angular.module('tuProfeApp')

        /**
         * Directive to read a file in a input.
         */
        .directive('fileReader', [function ($rootScope) {
            return {
                scope: {
                    fileReader: '='
                },
                link: function (scope, element, attributes) {
                    element.bind('change', function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileReader = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }])

        .directive('loader', function () {
            return {
                restrict: 'E',
                scope: {
                    show: '=',
                    message: '='
                },
                templateUrl: 'views/loading.html'
            };
        })

        .directive('imageonload', [function () {
            return {
                scope: {
                    imageonload: '='
                },
                link: function (scope, element, attrs) {
                    element.bind('error', function () {
                        attrs.$set('src', scope.imageonload)
                    });
                }
            };
        }]);
})();