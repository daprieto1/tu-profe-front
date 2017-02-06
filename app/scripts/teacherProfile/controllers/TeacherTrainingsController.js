(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherTrainingsController', function ($scope, TrainingServices, ServiceTeachers) {
            var vm = this;

            vm.getAnswerClass = function (answer) {
                var basic = 'callout answer ';
                if (angular.isDefined(vm.currentAnswer) && vm.currentAnswer === answer) {
                    if (vm.currentAnswer.isValid) {
                        return basic + 'success';
                    } else {
                        return basic + 'alert';
                    }
                } else if (!vm.hadResponse) {
                    return basic + 'small hvr-float-shadow';
                } else {
                    return basic + 'small secondary';
                }
            };

            vm.response = function (answer) {
                if (!vm.hadResponse) {
                    vm.hadResponse = true;
                    vm.currentAnswer = answer;
                    if (answer.isValid) {
                        vm.correctAnswers.push(answer);
                    } else {
                        vm.wrongAnswers.push(answer);
                    }
                }
            };

            vm.nextQuestion = function () {
                vm.currentAnswer = undefined;
                vm.hadResponse = false;
                if (vm.currentQuestion + 1 === vm.exam.questions.length) {
                    vm.hadFinished = true;
                    var exam = {
                        idExam: vm.exam.id,
                        correctAnswers: vm.correctAnswers.length,
                        wrongAnswers: vm.wrongAnswers.length,
                        passExam: vm.correctAnswers.length >= vm.exam.passLimit
                    };
                    vm.teacher.exam = exam;
                    if(exam.passExam){
                        alertify.success('Felicidades!. El examen ha sido aprovado.');
                    }else{
                        alertify.error('Lo sentimos!. Por favor revisa el material.');
                    }
                    ServiceTeachers.takeExam(vm.teacher.id, exam);
                } else {
                    vm.currentQuestion++;
                }
            };

            vm.restart = function () {
                vm.currentQuestion = 0;
                vm.correctAnswers = [];
                vm.wrongAnswers = [];
                vm.hadFinished = false;
                vm.hadResponse = false;
                vm.startTraining = true;
            };

            function initCtrl() {
                vm.teacher = $scope.teacher;
                vm.currentQuestion = 0;
                vm.currentAnswer = undefined;
                vm.correctAnswers = [];
                vm.wrongAnswers = [];
                vm.hadFinished = false;
                vm.hadResponse = false;
                vm.isFisrtTime = false;
                vm.startTraining = false;

                TrainingServices.get('1')
                            .then(function (response) {
                                vm.exam = response.toJSON();
                            });

                if (vm.teacher.exam.idExam !== null && angular.isDefined(vm.teacher.exam.idExam) && /\S/.test(vm.teacher.exam.idExam)) {
                    vm.hadFinished = true;
                    vm.correctAnswers = new Array(vm.teacher.exam.correctAnswers);
                    vm.wrongAnswers = new Array(vm.teacher.exam.wrongAnswers);
                    if (vm.teacher.exam.passExam) {

                    } else {
                        
                    }
                } else {
                    vm.isFisrtTime = true;
                }

            }

            initCtrl();
        });
})();