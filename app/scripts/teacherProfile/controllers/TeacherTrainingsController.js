(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherTrainingsController', function (TrainingServices) {
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
                } else {
                    vm.currentQuestion++;
                }
            }

            function initCtrl() {
                TrainingServices.get('1')
                    .then(function (response) {
                        vm.exam = response.toJSON();
                    });                
                vm.currentQuestion = 0;
                vm.currentAnswer = undefined;
                vm.correctAnswers = [];
                vm.wrongAnswers = [];
                vm.hadFinished = false;
                vm.hadResponse = false;
            }

            initCtrl();
        });
})();