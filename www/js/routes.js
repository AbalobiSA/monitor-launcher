angular.module('app.routes', [])

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider, $translateProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(false);

    $translateProvider.useStaticFilesLoader({
        prefix: 'data/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage("en");
    $translateProvider.useSanitizeValueStrategy('sanitize');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



    .state('home', {
        url: '/home',
        templateUrl: 'components/home/home.html',
        controller: 'homeCtrl'
    })
    .state('settings', {
        url: '/settings',
        templateUrl: 'components/settings/settings.html',
        controller: 'settingsCtrl'
    })
    .state('app_settings', {
        url: '/app_settings',
        templateUrl: 'components/app_settings/app_settings.html',
        controller: 'app_settingsCtrl'
    })

    /*.state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
    })*/

    $urlRouterProvider.otherwise('/home')



});
