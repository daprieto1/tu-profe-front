(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentNotificationsController', function ($scope, $cookies, $sce,NotificationServices, NOTIFICATION_TYPES) {
            var vm = this;
            
            vm.deleteNotification=notificationId=>{
                NotificationServices.delete(notificationId);
            };
            
            vm.selectNotification = notification => {
                vm.selectedNotification = notification;  
                if(!vm.selectedNotification.read){
                    vm.selectedNotification.read = true;
                    var notification = angular.copy(vm.selectedNotification);
                    notification.type = notification.type.id;
                    NotificationServices.update(notification);                 
                }
            };

            function initCtrl() {
                vm.notificationTypes = NOTIFICATION_TYPES;
                vm.selectedNotification;
                vm.notifications = [];
                
                vm.html=$sce.trustAsHtml("<p> Gracias por confiar en TuProfe, tu asesoria ha sido creada con éxito, no olvides que tienes máximo 3 días para pagar el servicio o este será automaticamente cancelado. Una vez pagues el servicio, se te asignara el mejor profesor para tus necesidades. </p> <p>Estos son los detalles de tu servicio:</p> <ul> <li><strong>Fecha de creación: </strong></li> <li><strong>Número de sesiones: </strong></li> <li><strong>Fecha primera sesión: </strong></li> <li><strong>Fecha última sesión: </strong></li> <li><strong>Valor total: </strong></li> </ul>");
                
                NotificationServices.getByUserId($cookies.get('userId'))
                    .then(notifications => {
                        vm.notifications = notifications.map(notification => {
                            notification.type = vm.notificationTypes.find(type => {return type.id === notification.type;});
                            notification.text = $sce.trustAsHtml(notification.text);
                            return notification;
                        });
                    });
            }

            initCtrl();
        });
})();