(function () {
    'use strict';

    angular.module('notificationModule')
        .factory('NotificationServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Notification = $resource(TU_PROFE_API + '/notifications/:id', { id: '@id' },{
                update : {
                    url:TU_PROFE_API + '/notifications',
                    method:'PUT'
                },
                
                getByUserId : {
                    url:TU_PROFE_API + '/notifications/user/:userId',
                    params:{userId:'@userId'},
                    method:'GET',
                    isArray:true
                }
            });

            return {

                getAll: () => {
                    return Notification.query().$promise;
                },
                
                update: (notification) => {
                    return Notification.update({ id: notification.id }, notification).$promise;
                },
                
                getByUserId: userId => {
                    return Notification.getByUserId({userId:userId}).$promise;
                }

            }
        });
})();