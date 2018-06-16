MyApp.factory("dashboardFactory", function ($http) {

    var factory = {};
   
    factory.recuperarGraficoPizza = function(){
        return $http({
            method: 'POST',
            data: {
            },
            url: 'http://localhost:55090/api/Manobra/RecuperarGraficoPizza'
        });
    };

    return factory;
});