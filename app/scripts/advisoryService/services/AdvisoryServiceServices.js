(function () {
    'use strict';

    angular.module('advisoryServiceModule')
        .factory('AdvisoryServiceServices', function ($resource, $q, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var AdvisoryService = $resource(TU_PROFE_API + '/advisory-services/:id', { id: '@id' },{
                calculate:{
                    method:'POST',
                    url: TU_PROFE_API + '/advisory-services/calculate'
                },
                getBySudent:{
                    method:'POST',
                    params: { studentId: '@studentId' },
                    isArray:true,
                    url: TU_PROFE_API + '/advisory-services/get-by-student/:studentId'
                }
            });

            return {
                getBySudent:studentId=>{
                    return $q((resolve,reject)=>{resolve([
                            {
                              "createdAt":"2017-05-08T05:00:00.000Z",
  "numStudents": 1,
  "months": 1,
  "sessionsPerWeek": 2,
  "startDate": "2017-05-08T05:00:00.000Z",
  "description": "Assembly language programmers sometimes use XOR as a short-cut to setting the value of a register to zero. Performing XOR on a value against itself always yields zero, and on many architectures this operation requires fewer clock cycles and memory than loading a zero value and saving it to the register.",
  "type": 1,
  "startTime": "12:00",
  "sessions": [
    {
      "startDate": "2017-05-08T05:00:00.000Z",
      "startTime": "12:00",
      "duration": 120,
      "dayOfWeek": 1
    },
    {
      "startDate": "2017-05-09T05:00:00.000Z",
      "startTime": "12:00",
      "duration": 120,
      "dayOfWeek": 2
    },
    {
      "startDate": "2017-05-15T05:00:00.000Z",
      "startTime": "12:00",
      "duration": 120,
      "dayOfWeek": 1
    },
    {
      "startDate": "2017-05-16T05:00:00.000Z",
      "startTime": "12:00",
      "duration": 120,
      "dayOfWeek": 2
    },
    {
      "startDate": "2017-05-22T05:00:00.000Z",
      "startTime": "12:00",
      "duration": 120,
      "dayOfWeek": 1
    },
    {
      "startDate": "2017-05-23T05:00:00.000Z",
      "startTime": "12:00",
      "duration": 120,
      "dayOfWeek": 2
    },
    {
      "startDate": "2017-05-29T05:00:00.000Z",
      "startTime": "12:00",
      "duration": 120,
      "dayOfWeek": 1
    },
    {
      "startDate": "2017-05-30T05:00:00.000Z",
      "startTime": "12:00",
      "startDateToShow": "30 de mayo de 2017",
      "duration": 120,
      "dayOfWeek": 2
    }
  ]
}
                        ])});
                    return AdvisoryService.getBySudent({studentId:studentId}).$promise;    
                },
                
                calculate: advisoryService => {
                    return AdvisoryService.calculate(advisoryService).$promise;
                }

            }
        });
})();