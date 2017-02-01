(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .controller('TeacherGameRulesController', function ($scope, ServiceTeachers) {
            var vm = this;

            vm.acceptGameRules = function () {            
                ServiceTeachers.acceptGameRules($scope.teacher.id)
                    .then(function () {
                        alertify.success('Has aceptado las reglas de juego');
                    }, function (error) {
                        alertify.error('No ha sido posible completar la operación, contacta al administrador.');
                    });
            };

        });
})();