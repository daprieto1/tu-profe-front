(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentNotificationsController', function ($scope, $cookies, NotificationServices, NOTIFICATION_TYPES) {
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
                
                NotificationServices.getByUserId($cookies.get('userId'))
                    .then(notifications => {
                        vm.notifications = notifications.map(notification => {
                            notification.type = vm.notificationTypes.find(type => {
                               return type.id === notification.type;
                            });
                            return notification;
                        });
                    });
            }

            initCtrl();
        });
})();