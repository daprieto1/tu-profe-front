(function () {
    angular.module('teacherProfileModule')
        .controller('TeacherBasicDataController', function ($scope, $cookies, $q, ServiceTeachers, CourseServices, SchoolServices, ProfessionServices) {
            var vm = this;

            vm.edit = function (section) {
                var teacher = angular.copy(vm.teacher);
                teacher.university = undefined || teacher.university.id
                teacher.profession = undefined || teacher.profession.id
                teacher.courses = teacher.courses.map(function (course) {
                    return course.id;
                });
                ServiceTeachers.update(teacher)
                    .then(function () {
                        vm.editData = {
                            account: false,
                            personal: false,
                            academical: false,
                            financial: false,
                            subjects: false
                        }
                        alertify.success('Tus datos han sido actualizados');
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

                $q.all([
                    SchoolServices.getAll(),
                    ProfessionServices.getAll(),
                    CourseServices.getAll()
                ])
                    .then(([schools, professions, courses]) => {
                        vm.universities = schools;
                        vm.professions = professions;
                        vm.subjects = courses;

                        ServiceTeachers.getTeacher(vm.teacherId)
                            .then(function (teacher) {
                                vm.teacher = teacher;
                                vm.teacher.gradeDate = new Date(vm.teacher.gradeDate);

                                vm.teacher.courses = vm.subjects.filter(function (course) {
                                    return vm.teacher.courses.indexOf(course.id) > -1;
                                });

                                vm.teacher.university = vm.universities.find(school => {
                                    return school.id === vm.teacher.university;
                                });

                                vm.teacher.profession = vm.professions.find(profession => {
                                    return profession.id === vm.teacher.profession;
                                });
                            });
                    });
            }

            initCtrl();
        });
})();