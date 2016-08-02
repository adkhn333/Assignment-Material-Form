app.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue', {
            'default': '800',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('purple', {
            'default': '200'
        });
})
;