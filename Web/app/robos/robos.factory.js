MyApp.factory("robosFactory", function ($http) {

    var factory = {};

    factory.listarRobo = function (paginacao) {
        
        return $http({
            method: 'POST',
            data: {
                'Page': paginacao.page,
                'Start': paginacao.start,
                'Limit': paginacao.limit
            },
            url: 'http://localhost:55090/api/Robos/Listar'
        });
    };

    factory.salvarRobo = function ($scope) {
        return $http({
            method: 'POST',
            data: {
                'Descricao': $scope.Descricao,
                'MacAddress': $scope.MacAddress,
                'Id': $scope.Id
            },
            url: 'http://localhost:55090/api/Robos/Salvar'
        });
    };

    factory.editarRobo = function(id){
        return $http({
            method: 'POST',
            data: {
                'Id': id
            },
            url: 'http://localhost:55090/api/Robos/RecuperarPorId'
        });
    };

    factory.removerRobo = function(id){
        return $http({
            method: 'POST',
            data: {
                'Id': id
            },
            url: 'http://localhost:55090/api/Robos/Remover'
        });
    };

    factory.pesquisarRobo = function(paginacao, keywords){
        return $http({
            method: 'POST',
            data: {
                'ValorPesquisa': keywords,
                'Page': paginacao.page,
                'Start': paginacao.start,
                'Limit': paginacao.limit
            },
            url: 'http://localhost:55090/api/Robos/Pesquisar'
        });
      };
  
  // updateProduct will be here

    return factory;
});