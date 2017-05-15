(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentNotificationsController', function ($scope, NotificationServices, NOTIFICATION_TYPES) {
            var vm = this;
            
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
                
                NotificationServices.getByUserId("2")
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