app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('app', {
            url: '/app',
            views: {
                "main": {
                    templateUrl: TEMPLATES_URL + 'app.html',
                    controller: 'appCtrl'
                }
            }
        })
        .state('app.home', {
            url: '.home',
            views: {
                "form-content": {
                    templateUrl: TEMPLATES_URL + 'home.html',
                    controller: 'homeCtrl'
                }
            }  
        })
        .state('app.databaseForm', {
            url: '.database-form',
            views: {
                "form-content": {
                    templateUrl: TEMPLATES_URL + 'database-form.html',
                    controller: 'databaseFormCtrl'
                }
            }
        })
        .state('app.apiForm', {
            url: '.api-form',
            views: {
                "form-content": {
                    templateUrl: TEMPLATES_URL + 'api-form.html',
                    controller: 'apiFormCtrl'
                }
            }
        })
    ;
    $urlRouterProvider.otherwise('/app'); 
})