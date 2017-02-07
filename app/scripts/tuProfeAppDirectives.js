(function() {
    'use strict';

    angular.module('tuProfeApp')

    /**
     * Directive to read a file in a input.
     */
    .directive('fileReader', function() {
        return {
            scope: {
                fileReader: '='
            },
            link: function(scope, element) {
                angular.element(element).on('change', function(changeEvent) {
                    var files = changeEvent.target.files;
                    if (files.length) {
                        var r = new FileReader();
                        r.onload = function(e) {
                            var contents = e.target.result;
                            scope.$apply(function() {
                                scope.fileReader = contents;
                            });
                        };

                        r.readAsText(files[0]);
                    }
                });
            }
        };
    })

    .directive('loader', function() {
        return {
            restrict: 'E',
            scope: {
                show: '=',
                message: '='
            },
            templateUrl: 'views/loading.html'
        };
    })

    .directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    attrs.$set('src', 'https://d1ql3lvdg7tehd.cloudfront.net/teacher/profile-photo/teacher.svg')
                });
            }
        };
    });
})();