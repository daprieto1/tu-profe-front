(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherBasicDataController', function ($scope, $cookies, ServiceTeachers, CourseServices, SchoolServices) {
            var vm = this;

            vm.edit = function (section) {
                ServiceTeachers.update(vm.teacher)
                    .then(function () {
                        switch (section) {
                            case 1:
                                vm.editData.account = false;
                                break;
                            case 2:
                                vm.editData.personal = false;
                                break;
                            case 3:
                                vm.editData.academical = false;
                                break;
                            case 4:
                                vm.editData.financial = false;
                                break;
                        }
                        alertify.success('Tus datos han sido actualizados');
                    });
            };

            vm.editCourses = function () {
                vm.editData.subjects = false;
                var teacher = angular.copy(vm.teacher);
                teacher.courses = teacher.courses.map(function (course) {
                    return course.id;
                });
                ServiceTeachers.update(teacher)
                    .then(function (teacher) {
                        alertify.success('El cambio en las materias ha sido guardado');
                    }, function () {
                        alertify.error('Un error ha ocurrido, contacte al administrador.');
                    });
            };

            vm.removeSubject = function (index) {
                vm.teacher.courses.splice(index, 1);
            };

            function initCtrl() {
                vm.teacherId = $cookies.get('userId');
                vm.editData = {
                    account: false,
                    personal: false,
                    academical: false,
                    financial: false,
                    subjects: false
                }

                SchoolServices.getAll()
                    .then(schools => {
                        vm.schools = schools;
                    });

                CourseServices.getAll()
                    .then(function (response) {
                        console.log(response);
                        vm.subjects = response;
                        ServiceTeachers.getTeacher(vm.teacherId)
                            .then(function (response) {                                
                                vm.teacher = response.toJSON();
                                /*vm.teacher.courses = vm.subjects.filter(function (course) {
                                    return vm.teacher.courses.indexOf(course.id) > -1;
                                });*/
                            });
                    });

            }

            initCtrl();
        });
})();