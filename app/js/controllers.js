app.controller('appCtrl', function($scope,$mdSidenav, $mdInkRipple, $rootScope){
    $rootScope.pageTitle = "";
    $scope.toggleSidenav =function(componentId) {
        $mdSidenav(componentId)
            .toggle();  
    };
    $rootScope.tracking_id = 1234567890;
    $scope.onClick = function(ev) {
        //$myInkRipple Is a Custom Made Service By Me Only. But We Can Use $ndInkRipple The Same Way So Why Extra Service
        //$myInkRipple.attach($scope, angular.element(ev.target), {center:false});
        $mdInkRipple.attach($scope, angular.element(ev.target), angular.extend({
            center:false,
            dimBackground: false
        }, {center: false}));
    };
})

app.controller('homeCtrl', function($scope, $rootScope){
    $rootScope.pageTitle = "Home";
})

app.controller('databaseFormCtrl', function($scope, $http, $rootScope, Toast) {
    $scope.operation = 'Insert';
    $rootScope.pageTitle = "Database Form";
    $scope.trackingId = $rootScope.trackingId;
    var req = {
        method: 'GET',
        url: 'http://139.162.44.67/getDatabaseDictionary'
    };
    $http(req).then(function successCallback(response) {
        $scope.entityNames = response.data.Items;
        Toast.showToast(response.data.Message);
    }, function errorCallback(response){
        console.log(response);
        if(response.data != null || response.data != undefined) {
            if(response.data.message === undefined || response.data.message === null) {
                Toast.showToast(response.data.error);
            }
            else {
                Toast.showToast(response.data.Message);
            }
        }    
    });
    $scope.entityTypes = [
        {value: "0", display: 'Stored Procedures'},
        {value: "1", display: 'Tables'},
        {value: "2", display: 'Functions'},
        {value: "3", display: 'Views'},
        {value: "4", display: 'Triggers'},
    ];
    $scope.insert = function() {
        var data = {
            entityName: $scope.entityName,
            shortName: $scope.shortName,
            description: $scope.description,
            entityType: $scope.entityType,
            projectName: $scope.projectName,
            moduleName: $scope.moduleName,
            details: $scope.details,
            sample: $scope.sample,
            trackingId: $scope.trackingId
        };
        
        var req = {
            method: 'POST',
            url: 'http://139.162.44.67/insertDbDictionary',
            data: data
        };
        
        $http(req).then(function successCallback(response){
            console.log('Successfully Inserted');
            Toast.showToast(response.data.Message);
            console.log(response);
        }, function errorCallback(response){
            console.error('Insert Fail');
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
        
    };
    $scope.update = function() {
        var data = {
            entityId: $scope.entityId,
            entityName: $scope.entityName,
            shortName: $scope.shortName,
            entityType: $scope.entityType,
            projectName: $scope.projectName,
            moduleName: $scope.moduleName,
            description: $scope.description,
            details: $scope.details,
            sample: $scope.sample,
            trackingId: $scope.trackingId  
        };
        
        var req = {
            method: 'POST',
            url: 'http://139.162.44.67/updateDbDictionary',
            data: data
        };
        
        $http(req).then(function successCallback(response){
            console.log('Successfully Updated');
            Toast.showToast(response.data.Message);
            console.log(response);
        }, function errorCallback(response){
            console.error('Update Fail');
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
    };
    $scope.delete = function() {
        var data = {
            entityId: $scope.entityId
        };
        
        var req = {
            method: 'POST',
            url: 'http://139.162.44.67/deleteDbDictionary',
            data: data
        };
        
        $http(req).then(function successCallback(response){
            console.log('Successfully Deleted');
            Toast.showToast(response.data.Message);
            console.log(response);
        }, function errorCallback(response){
            console.error('Delete Fail');
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
    };
    $scope.searchDB = function(eName) {
        var req = {
            method: 'POST',
            url: 'http://139.162.44.67/insertDbDictionary'/*Change with new api*/,
        };
        
        $http(req).then(function successCallback(response){
            console.log('Successfully Inserted');
            Toast.showToast(response.data.Message);
            console.log(response);
        }, function errorCallback(response){
            console.error('Insert Fail');
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
    }
    $scope.getData = function(uid) {
        console.log(uid);
        $scope.apiId = uid;
        var req = {
            method: 'GET',
            url: 'http://139.162.44.67/getDatabaseDictionaryForUpdate?entityId='+uid
        };
        console.log(req);
        $http(req).then(function successCallback(response) {
            Toast.showToast(response.data.Message);
            if(response.data.Items != undefined) {
                $scope.entityId = uid;
                $scope.shortName = response.data.Items[0].shortName;
                $scope.entityType = response.data.Items[0].entityType;
                $scope.projectName = response.data.Items[0].projectName;
                $scope.moduleName = response.data.Items[0].moduleName;
                $scope.description = response.data.Items[0].description;
                $scope.details = response.data.Items[0].details;
                $scope.sampleApi = response.data.Items[0].sampleApi;
            }
            else {
                Toast.showToast('Unhandled Exception');
            }
        }, function errorCallback(response){
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
    }
    insertUpdate();
    $scope.toggle = function(){
        console.log($scope.operation)
        insertUpdate();
    }
    function insertUpdate() {
        if($scope.operation === 'Insert') {
            angular.element(document.getElementById('entityUpdate')).addClass('ng-hide');
            angular.element(document.getElementById('entityUpdateButton')).addClass('ng-hide');
            angular.element(document.getElementById('entityInsert')).removeClass('ng-hide');
            angular.element(document.getElementById('entityInsertButton')).removeClass('ng-hide');
        }
        else {
            angular.element(document.getElementById('entityInsert')).addClass('ng-hide');
            angular.element(document.getElementById('entityInsertButton')).addClass('ng-hide');
            angular.element(document.getElementById('entityUpdate')).removeClass('ng-hide');
            angular.element(document.getElementById('entityUpdateButton')).removeClass('ng-hide');
        }
    }
})

app.controller('apiFormCtrl',function(Toast, $scope, $http, $rootScope, API_List, $q) {
    $scope.operation = 'Insert';
    $rootScope.pageTitle = "API Form";
    $scope.trackingId = $rootScope.trackingId;
    $scope.api_list = [];
    $scope.apiTypes = [
        {value: "0", display: 'POST'},
        {value: "1", display: 'GET'}
    ];
    var req = {
        method: 'GET',
        url: 'http://139.162.44.67/getApiDictionary'
    };

    $http(req).then(function successCallback(response) {
        $scope.api_list = response.data.Items;
        console.log(response.data.Items);
        Toast.showToast(response.data.Message);
    }, function errorCallback(response){
        console.log(response);
        if(response.data != null || response.data != undefined) {
            if(response.data.message === undefined || response.data.message === null) {
                Toast.showToast(response.data.error);
            }
            else {
                Toast.showToast(response.data.Message);
            }
        } 
    });

    $scope.getApi = function(uid) {
        console.log(uid);
        $scope.apiId = uid;
        var req = {
            method: 'GET',
            url: 'http://139.162.44.67/getApiDictionaryForUpdate?apiId='+uid
        };
        console.log(req);
        $http(req).then(function successCallback(response) {
            Toast.showToast(response.data.Message);
            if(response.data.Items != undefined) {
                $scope.fileName = response.data.Items[0].fileName;
                $scope.apiType = response.data.Items[0].apiType;
                $scope.projectName = response.data.Items[0].projectName;
                $scope.moduleName = response.data.Items[0].moduleName;
                $scope.description = response.data.Items[0].description;
                $scope.details = response.data.Items[0].details;
                $scope.sampleApi = response.data.Items[0].sampleApi;
                $scope.parameter = response.data.Items[0].parameter;
                $scope.apiPath = response.data.Items[0].apiPath;
            }
            else {
                Toast.showToast('Unhandled Exception');
            }
        }, function errorCallback(response){
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
    }
    
    $scope.insert = function() {
        var data = {
            description: $scope.description,
            projectName: $scope.projectName,
            moduleName: $scope.moduleName,
            sample: $scope.sample,
            trackingId: $scope.trackingId,
            entityId: $scope.entityId,
            apiName: $scope.apiName,
            apiType: $scope.apiType,
            parameter: $scope.parameter,
            fileName: $scope.fileName,
            apiPath: $scope.apiPath,
            details: $scope.details,
            sampleApi: $scope.sampleApi,
        };
        
        var req = {
            method: 'POST',
            url: 'http://139.162.44.67/insertApiDictionary',
            data: data  
        };
        
        $http(req).then(function successCallback(response){
            console.log('Successfully Inserted');
            Toast.showToast(response.data.Message);
            console.log(response);
        }, function errorCallback(response){
            console.error('Insert Fail');
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
        
    };
    $scope.update = function() {
        var data = {
            apiId: $scope.apiId,
            description: $scope.description,
            projectName: $scope.projectName,
            moduleName: $scope.moduleName,
            sample: $scope.sample,
            trackingId: $scope.trackingId,
            entityId: $scope.entityId,
            apiName: $scope.apiName,
            apiType: $scope.apiType,
            parameter: $scope.parameter,
            fileName: $scope.fileName,
            apiPath: $scope.apiPath,
            details: $scope.details,
            sampleApi: $scope.sampleApi,
        };
        
        var req = {
            method: 'POST',
            url: 'http://139.162.44.67/updateApiDictionary',
            data: data  
        };
        
        $http(req).then(function successCallback(response){
            console.log('Successfully Update');
            Toast.showToast(response.data.Message);
            console.log(response);
        }, function errorCallback(response){
            console.error('Update Fail');
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
        
    };
    $scope.delete = function() {
        console.log($scope);
        var data = {
            apiId: $scope.apiId
        };
        
        var req = {
            method: 'POST',
            url: 'http://139.162.44.67/deleteApiDictionary',
            data: data  
        };
        
        $http(req).then(function successCallback(response){
            console.log('Successfully Deleted');
            Toast.showToast(response.data.Message);
            console.log(response);
        }, function errorCallback(response){
            console.error('Delete Failed');
            if(response.data != null || response.data != undefined) {
                if(response.data.message === undefined || response.data.message === null) {
                    Toast.showToast(response.data.error);
                }
                else {
                    Toast.showToast(response.data.Message);
                }
            } 
            console.log(response);
        });
        
    };
    insertUpdate();
    $scope.toggle = function(){
        console.log($scope.operation)
        insertUpdate();
    }
    function insertUpdate() {
        if($scope.operation === 'Insert') {
            angular.element(document.getElementById('entityUpdate')).addClass('ng-hide');
            angular.element(document.getElementById('entityUpdateButton')).addClass('ng-hide');
            angular.element(document.getElementById('entityInsert')).removeClass('ng-hide');
            angular.element(document.getElementById('entityInsertButton')).removeClass('ng-hide');
        }
        else {
            angular.element(document.getElementById('entityInsert')).addClass('ng-hide');
            angular.element(document.getElementById('entityInsertButton')).addClass('ng-hide');
            angular.element(document.getElementById('entityUpdate')).removeClass('ng-hide');
            angular.element(document.getElementById('entityUpdateButton')).removeClass('ng-hide');
        }
    }
})

;