(function(){
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentCalendarController',function($cookies, AdvisoryServiceServices){
            var vm = this;
            
            function initCrtl(){
                vm.events = [];
                vm.studentId = $cookies.get('userId');
                
                AdvisoryServiceServices.getAllByStudentId(vm.studentId)
                    .then(advisoryServices => {
                        advisoryServices.forEach(advisoryService => {
                            vm.events = vm.events.concat(AdvisoryServiceServices.parseAdvisoryServiceToEvent(advisoryService));
                        });
                        vm.calendar = angular.element('#calendar').fullCalendar({
                            header: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            },
                            defaultDate: moment().startOf('week').format('YYYY-MM-DD'),
                            defaultView: 'month',
                            editable: true,
                            events: vm.events
                        });
                    });
                    
            }
            
            initCrtl();
        });
})();