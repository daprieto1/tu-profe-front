(function () {
    'use strict';
    angular.module('advisoryServiceModule', [])
        .run(($rootScope) => {
            $rootScope.getFileImg = fileType => {
                var img = 'images/studentProfile/requestAdvisory/';                
                switch (fileType) {
                    case 'image/png':
                    case 'png':
                        img += 'png.svg';
                        break;
                    case 'image/jpeg':
                    case 'jpeg':
                    case 'jpg':
                    case 'png':
                        img += 'jpg.svg';
                        break;
                    case 'image/svg+xml':
                        img += 'svg.svg';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    case 'docx':
                    case 'doc':
                        img += 'doc.svg';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    case 'xlsx':
                    case 'xls':
                        img += 'xls.svg';
                        break;
                    default:
                        img += 'doc.svg';
                        break;
                }
                return img;
            };
        });
})();