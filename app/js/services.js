app.factory('$myInkRipple', function($mdInkRipple){
    return {
        attach: function(scope, element, options) {
            return $mdInkRipple.attach(scope, element, angular.extend({
                center: false,
                dimBackground: true
            }, options));
        }
    };
})

app.factory('API_List', function($http) {
    var API = {};
    var req = {
        method: 'GET',
        url: 'http://139.162.44.67/getDatabaseDictionary'
    };
    $http(req).then(function successCallback(response){
        console.log(response.data.Items);
        API = response.data.Items;
    }, function errorCallback(response){
        console.error(response);
        API = undefined;
    });
    return API;
})

app.factory('Toast', function($mdToast) {
    var Toast = {};
    Toast = {
        showToast: function(status) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(status)
                    .position('top right')
                    .hideDelay(3000)
            );
        }
    };
    return Toast;
})

;