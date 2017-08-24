(function () {
    'use strict';

    angular.module('studentProfileModule')
        .controller('RequestAdvisoryController', function ($scope, $timeout, $cookies, ServiceUtils, AdvisoryServiceServices, CourseServices, ServiceStudents, DAYS_OF_WEEK, ADVISORY_SERVICES_TYPE) {
            var vm = this;

            vm.reset = () => initCtrl();

            vm.addFile = () => {
                $timeout(() => {
                    angular.element('#file-real-input').click();
                }, 0);
            };

            vm.getFileImg = fileType => {
                var img = 'images/studentProfile/requestAdvisory/';
                switch (fileType) {
                    case 'image/png':
                        img += 'png.svg';
                        break;
                    case 'image/jpeg':
                        img += 'jpg.svg';
                        break;
                    case 'image/svg+xml':
                        img += 'svg.svg';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        img += 'doc.svg';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        img += 'xls.svg';
                        break;
                    default:
                        img += 'doc.svg';
                        break;
                }
                return img;
            };

            vm.disableDayOfWeekButton = index => {
                var activeDays = vm.service.daysOfWeek.filter(day => { return day; }).length;
                if (activeDays >= vm.service.sessionsPerWeek && !vm.service.daysOfWeek[index]) {
                    vm.disable = true;
                } else {
                    vm.disable = false;
                }
                return vm.disable;
            };

            vm.showInsightSessions = () => {
                var show = vm.service.daysOfWeek.filter(day => day).length === parseInt(vm.service.sessionsPerWeek)
                    && parseInt(vm.service.sessionsPerWeek) > 0
                    && parseInt(vm.service.months) > 0;
                if (!show) { vm.showSessions = false }
                return show;
            };

            vm.selectDayOfWeek = index => {
                if ((vm.disable && vm.service.daysOfWeek[index]) || (!vm.disable)) {
                    vm.service.daysOfWeek[index] = !vm.service.daysOfWeek[index];
                }
            };

            vm.changeSessionsPerWeek = () => {
                vm.service.daysOfWeek = [false, false, false, false, false, false, false];
            };

            vm.createService = () => {

                var service = parseService();

                AdvisoryServiceServices.create(service)
                    .then(async advisoryService => {
                        vm.successCreateService = true;
                        advisoryService.createdAt = moment(advisoryService.createdAt).format('LL');
                        advisoryService.sessions = advisoryService.sessions.map(session => {
                            session.startDate = moment(session.startDate).format('LL');
                            return session;
                        })
                        vm.createdService = advisoryService;
                        alertify.success('El servicio se ha creado exitosamente!');
                        for (var i = 0; i < vm.files.length; i++) {
                            await AdvisoryServiceServices.uploadFile(vm.files[i], advisoryService.id);
                        }                        
                    })
                    .catch(err => {
                        alertify.error('Lo sentimos, no hemos podido crear el servicio, ' + err.data + ' Si necesitas ayuda puedes comunicarte a servicio al cliente.');
                    });

            };

            $scope.$watch('vm.service', function (old, newd) {
                var service = parseService();
                AdvisoryServiceServices.calculate(service)
                    .then(advisoryService => {
                        var idCostElement = service.type === 1 ? '#service-total-cost-tutor' : '#service-total-cost-specific';
                        angular.element(idCostElement).removeClass().addClass('shake animated');
                        vm.cost = advisoryService.cost;
                    })
                    .catch(err => vm.cost = undefined);

                if (vm.service.daysOfWeek.filter(day => { return day; }).length === parseInt(vm.service.sessionsPerWeek)) {
                    vm.showSessions = false;
                    vm.sessions = [];
                    var numSessions = vm.service.type === 1 ? vm.service.months * 4 * vm.service.sessionsPerWeek : vm.service.numSessions;
                    var dayINeed = 1;
                    var dateInit = moment(vm.service.startDate);

                    var days = vm.service.daysOfWeek
                        .map((day, index) => { return day ? index : -1; })
                        .filter(day => { return day >= 0; });

                    var j = 0;
                    var numSessionsTemp = angular.copy(numSessions);
                    for (var i = 0; i < numSessionsTemp; i++) {
                        var sessionDate = moment(dateInit).day(days[j]).week(dateInit.week()).startOf('day');
                        if (sessionDate > moment(vm.service.startDate)) {
                            vm.sessions.push({
                                startDate: sessionDate.toDate(),
                                startTime: vm.startTime.wickedpicker('time'),
                                startDateToShow: sessionDate.format('LL'),
                                duration: 120,
                                dayOfWeek: days[j]
                            });
                        } else {
                            numSessionsTemp++;
                        }
                        j++;
                        if (j === days.length) {
                            j = 0;
                            dateInit = moment(dateInit).add(1, 'weeks').isoWeekday(dayINeed);
                        }
                    }
                }
            }, true);

            $scope.$watch('vm.specificStep', () => {
                if (vm.specificStep === 2) {
                    vm.sessions = [];
                    vm.service.sessionsPerWeek = 0;
                    vm.service.daysOfWeek = [false, false, false, false, false, false, false];
                    $timeout(() => {
                        vm.startTime = angular.element('#startTime-static').wickedpicker({ now: "12:00", minutesInterval: 30 });
                    }, 100);
                }
            });

            $scope.$watch('vm.advisoryFile', (newValue, oldValue) => {
                var aux = angular.element(document.querySelector('#file-real-input'));
                if (angular.isDefined(aux) && angular.isDefined(aux.prop('files'))) {
                    var file = aux.prop('files')[0];

                    if (angular.isDefined(file)) {
                        vm.files.push(file);
                    }
                }
            });

            function parseService() {
                var service = angular.copy(vm.service);
                service.sessions = angular.copy(vm.sessions);
                service.sessions.forEach(session => { session.startTime = ServiceUtils.timeToMilitarFormat(session.startTime); });

                if (vm.service.type === 1) {
                    service.months = parseInt(service.months);
                } else if (vm.service.type === 2) {
                    service.timePerSession = parseInt(service.timePerSession);
                    service.numSessions = parseInt(service.numSessions);
                }

                service.numStudents = parseInt(service.numStudents);
                service.sessionsPerWeek = parseInt(service.sessionsPerWeek);
                service.startDate.setHours(0, 0, 0, 0);
                service.startTime = ServiceUtils.timeToMilitarFormat(vm.startTime.wickedpicker('time'));

                return service;
            }

            function initCtrl() {
                vm.specificStep = 1;
                vm.showSessions = false;
                vm.successCreateService = false;
                vm.daysOfWeek = DAYS_OF_WEEK;
                vm.disable;
                vm.sessions = [];
                vm.files = [];
                vm.today = moment().add(7, 'd').format('YYYY-MM-DD');
                vm.startTime = angular.element('#startTime').wickedpicker({ now: "12:00", minutesInterval: 30 });
                vm.advisoryFile = undefined;
                vm.student;

                vm.service = {
                    type: undefined,
                    studentId: $cookies.get('userId'),
                    numSessions: 0,
                    numStudents: 0,
                    months: 0,
                    timePerSession: 0,
                    sessionsPerWeek: 0,
                    startDate: moment().add(7, 'd').toDate(),
                    description: '',
                    daysOfWeek: [false, false, false, false, false, false, false]
                };

                CourseServices.getAll()
                    .then(courses => vm.courses = courses);

                ServiceStudents.getStudent($cookies.get('userId'))
                    .then(student => {
                        vm.student = student;
                        vm.service.city = vm.student.city;
                        vm.service.address = vm.student.address;
                    });

            }

            initCtrl();
        });
})();