(function () {
    'use strict';
    angular.module('studentProfileModule')
        .controller('StudentNotificationsController', function ($scope, NotificationServices, NOTIFICATION_TYPES) {
            var vm = this;
            
            vm.selectNotification = notification => {
              vm.selectedNotification = notification;  
            };

            function initCtrl() {
                vm.notificationTypes = NOTIFICATION_TYPES;
                vm.selectedNotification;
                vm.notifications = [
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:1,
                        read:false
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:2,
                        read:true
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:3,
                        read:false
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:4,
                        read:false
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:5,
                        read:false
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:2,
                        read:false
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:2,
                        read:true
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:2,
                        read:false
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:2,
                        read:true
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:2,
                        read:true
                    },
                    {
                        title:'Esto es un título',
                        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius est sed lorem dignissim elementum. Maecenas pulvinar, turpis at suscipit convallis, odio urna interdum quam, nec tincidunt ipsum lorem nec tortor. Nam eros eros, condimentum nec pharetra id, vehicula et quam. Donec ut pharetra ipsum. Aliquam vestibulum aliquet massa eget porta. Nunc sit amet sem sed diam euismod posuere. Curabitur scelerisque orci eu ante porta consequat. Etiam sollicitudin, sapien eget commodo eleifend, nibh massa varius eros, sed consectetur augue lacus ac libero. Curabitur sollicitudin maximus ex. Donec sodales, lorem et vestibulum tincidunt, urna arcu tempus lorem, a luctus orci est id sapien. Mauris tincidunt, purus et egestas blandit, arcu orci scelerisque purus, vitae molestie orci elit imperdiet nisl. Proin quis enim eu tortor malesuada elementum. Fusce eu purus ex. Donec ac egestas nisl, eget vehicula tortor.',
                        type:2,
                        read:false
                    }
                ];
                vm.notifications = vm.notifications.map(notification => {
                   notification.type = vm.notificationTypes.find(type => {
                       return type.id === notification.type;
                   });
                   return notification;
                });
                
                NotificationServices.getByUserId("2")
                    .then(notifications => {
                        console.log(notifications);
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