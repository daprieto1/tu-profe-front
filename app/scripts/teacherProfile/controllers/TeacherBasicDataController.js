(function() {
    angular.module('teacherProfileModule')
        .controller('TeacherBasicDataController', function($scope, $cookies, ServiceTeachers) {
            var vm = this;

            vm.edit = function(section) {
                ServiceTeachers.update(vm.teacher)
                    .then(function() {
                        section = false;
                    });
            };

            vm.removeSubject = function(index) {
                vm.teacher.subjects.splice(index, 1);
            };

            function initCtrl() {
                vm.teacherId = $cookies.get('userId');
                vm.subjects = [{
                    area: "Idioma",
                    classification: "Especializado",
                    course: "Alemán",
                    id: "1"
                }, {
                    area: "Idioma",
                    classification: "Especializado",
                    course: "Ingles",
                    id: "2"
                }, {
                    area: "Idioma",
                    classification: "Especializado",
                    course: "Frances",
                    id: "3"
                }, {
                    area: "Idioma",
                    classification: "Especializado",
                    course: "Ruso",
                    id: "4"
                }, {
                    area: "Idioma",
                    classification: "Especializado",
                    course: "Español",
                    id: "5"
                }];
                vm.teacher = {
                    subjects: []
                };
                vm.teacher.subjects.push(vm.subjects[0]);
                vm.editData = {
                    account: false,
                    personal: false,
                    academical: false,
                    financial: false,
                    subjects: false
                }

                ServiceTeachers.getTeacher(vm.teacherId)
                    .then(function(response) {
                        vm.teacher = response.toJSON();
                    });
            }

            initCtrl();
        });
})();