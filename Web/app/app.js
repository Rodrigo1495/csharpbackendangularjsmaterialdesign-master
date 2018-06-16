﻿var MyApp = angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'cl.paging']).controller('AppCtrl', AppCtrl);

function AppCtrl($scope) {
    $scope.currentNavItem = 'dashboard';
}
MyApp.config(function ($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true)
    $routeProvider.when('/index.html', {
        templateUrl: '/app/dashboard/dashboard_partial.html',
        controller: 'AppCtrl'
    }).when('/dashboard', {
        templateUrl: '/app/dashboard/dashboard_partial.html',
        controller: 'AppCtrl'
    }).when('/robos', {
            templateUrl: '/app/robos/lista_robos.template.html',
            controller: 'AppCtrl'
    }).when('/manobra', {
            templateUrl: '/app/manobra/lista_manobra.template.html',
            controller: 'AppCtrl'
    });
});

MyApp.config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.shortMonths = ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    $mdDateLocaleProvider.Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    $mdDateLocaleProvider.days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
    $mdDateLocaleProvider.shortDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY');
    };
});

MyApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
