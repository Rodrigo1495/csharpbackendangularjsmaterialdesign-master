MyApp.factory("manobraFactory", function ($http) {

    var factory = {};

    factory.listarRobos = function () {
        
        return $http({
            method: 'POST',
            url: 'http://localhost:55090/api/Manobra/ListarRobos'
        });
    };

    factory.listarManobra = function (paginacao) {
        
        return $http({
            method: 'POST',
            data: {
                'Page': paginacao.page,
                'Start': paginacao.start,
                'Limit': paginacao.limit
            },
            url: 'http://localhost:55090/api/Manobra/Listar'
        });
    };

    factory.salvarManobra = function ($scope) {
        return $http({
            method: 'POST',
            data: {
                'Descricao': $scope.Descricao,
                'DataInicio': $scope.DataInicio,
                'DataFim': $scope.DataFim,
                'Id': $scope.Id,
                'Observacao': $scope.Observacao,
                'Robos': $scope.robo
            },
            url: 'http://localhost:55090/api/Manobra/Salvar'
        });
    };

    factory.editarManobra = function(id){
        return $http({
            method: 'POST',
            data: {
                'Id': id
            },
            url: 'http://localhost:55090/api/Manobra/RecuperarPorId'
        });
    };

    factory.removerManobra = function(id){
        return $http({
            method: 'POST',
            data: {
                'Id': id
            },
            url: 'http://localhost:55090/api/Manobra/Remover'
        });
    };

    factory.pesquisarManobra = function(paginacao, keywords){
        return $http({
            method: 'POST',
            data: {
                'ValorPesquisa': keywords,
                'Page': paginacao.page,
                'Start': paginacao.start,
                'Limit': paginacao.limit
            },
            url: 'http://localhost:55090/api/Manobra/Pesquisar'
        });
    };

    factory.removerManobrasVinculadasAoRobo = function(id){
        return $http({
            method: 'POST',
            data: {
                'Id': id
            },
            url: 'http://localhost:55090/api/Manobra/RemoverVinculadoRobo'
        });
    }
  
  // updateProduct will be here

    return factory;
});