MyApp.controller('manobraController', function ($scope, $mdDialog, $mdToast, manobraFactory) {

    $scope.robo = null;
    $scope.robos = [];
    $scope.show_filters = false;
    $scope.arquivo = null;

    $scope.currentPage = 0;

    $scope.paging = {
        total: 1,
        current: 1,
        onPageChanged: loadPages,
        qtde: 5
    };

    function loadPages() {  
        $scope.currentPage = $scope.paging.current;
        if(!$scope.manobra_search_keywords){
            $scope.listarManobra();
        }else{
            $scope.pesquisarManobra();
        }
    };
    

    $scope.ordenarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };

    $scope.excluirManobraPorRobo = function(event, idRobo){
        var confirm = $mdDialog.confirm()
            .title('Pergunta')
            .textContent('Deseja remover todas as manobras vinculadas a este robô?')
            .targetEvent(event)
            .ok('Sim')
            .cancel('Não');

        $mdDialog.show(confirm).then(
            function () {
                $scope.confirmaRemoverManobraVinculadaAoRobo(idRobo);
            },

            function () {
                // hide dialog
            }
        );
    },

    $scope.confirmaRemoverManobraVinculadaAoRobo = function(idRobo){

        manobraFactory.removerManobrasVinculadasAoRobo(idRobo).then(function successCallback(response){
      
          $scope.showToast(response.data.Mensagem);
      
          $scope.listarManobra();
      
        }, function errorCallback(response){
            $scope.showToast(response.data.Mensagem);
        });
      
    },

    $scope.pesquisarManobra = function(){
        if(!$scope.manobra_search_keywords){
            $scope.listarManobra();
            return;
        }

        var paginacao = {
            page: $scope.paging.current,
            start: $scope.paging.current * $scope.paging.qtde,
            limit: $scope.paging.qtde
        };

        manobraFactory.pesquisarManobra(paginacao, $scope.manobra_search_keywords).then(function successCallback(response){
          $scope.paging.total = Math.trunc(response.data.Quantidade.Quantidade / $scope.paging.qtde) + 1;
          $scope.manobras = response.data.Content;
        }, function errorCallback(response){
          $scope.showToast(response.data.Mensagem);
        });
    },

    $scope.loadRobos = function() {
  
        manobraFactory.listarRobos().then(function successCallback(response) {
            $scope.robos = response.data.Content;
        }, function errorCallback(response) {
            $scope.showToast(response.data.Message);
        });
    },

    $scope.isNovoCadastro = function(){
        return $scope.Id ? true: false;
    },

    $scope.showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(2000)
                .position("top left")
        );
    },

    $scope.listarManobra = function () {
        
        var paginacao = {
            page: $scope.paging.current,
            start: $scope.paging.current * $scope.paging.qtde,
            limit: $scope.paging.qtde
        };
        
        manobraFactory.listarManobra(paginacao).then(function successCallback(response) {
            $scope.paging.total = Math.trunc(response.data.Quantidade.Quantidade / $scope.paging.qtde) + 1;
            $scope.manobras = response.data.Content;
        }, function errorCallback(response) {
            $scope.showToast(response.data.Message);
        });

    },

    $scope.showNovaManobraForm = function (event) {
        $scope.show_filters = true;
        $scope.DataInicio = new Date();
        $scope.DataFim = new Date();

        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/manobra/cadastro_manobra.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).finally(function() {
            $scope.show_filters = false;
        });
    },

    $scope.showFormExcluirPorRobo = function(event) {
        $scope.show_filters = true;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/manobra/excluir_robo.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).finally(function() {
            $scope.show_filters = false;
        });
    },

    $scope.salvarManobra = function () {
        manobraFactory.salvarManobra($scope).then(function successCallback(response) {
            $scope.showToast(response.data.Mensagem);

            $scope.listarManobra();

            $scope.cancel();

            $scope.clearManobraForm();
        }, function errorCallback(response){
            $scope.showToast(response.data.Mensagem);
            $scope.clearManobraForm();
        });
    },

    $scope.clearManobraForm = function () {
        $scope.Id = "";
        $scope.Descricao = "";
        $scope.DataInicio = "";
        $scope.Observacao = "";
        $scope.DataFim = "";

        $scope.robos = [];
    },

    $scope.editarManobra = function (id) {

        manobraFactory.editarManobra(id).then(function successCallback(response) {
            $scope.show_filters = true;

            // put the values in form
            $scope.Id = response.data.Content.Id;
            $scope.Descricao = response.data.Content.Descricao;
            $scope.DataInicio = response.data.Content.DataInicio;
            $scope.DataFim = response.data.Content.DataFim;
            $scope.Observacao = response.data.Content.Observacao;
            
            $scope.robos.push(response.data.Content.Robos);
            $scope.robo = response.data.Content.Robos;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/manobra/cadastro_manobra.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).finally(function() {
                $scope.show_filters = false;
            }).then(
                function () { },

                // user clicked 'Cancel'
                function () {
                    $scope.clearManobraForm();
                }
            );

        }, function errorCallback(response) {
            $scope.showToast(response.data.Mensagem);
        });

    },

    $scope.removerManobra = function (event, id) {

        $scope.Id = id;

        var confirm = $mdDialog.confirm()
            .title('Pergunta')
            .textContent('Deseja remover a manobra?')
            .targetEvent(event)
            .ok('Sim')
            .cancel('Não');

        $mdDialog.show(confirm).then(

            function () {
                $scope.confirmaRemoverManobra();
            },

            function () {
                // hide dialog
            }
        );
    },

    $scope.confirmaRemoverManobra = function(){

        manobraFactory.removerManobra($scope.Id).then(function successCallback(response){
      
          $scope.showToast(response.data.Mensagem);
      
          $scope.listarManobra();
      
        }, function errorCallback(response){
            $scope.showToast(response.data.Mensagem);
        });
      
    },

      $scope.pesquisarRobo = function(){
            if(!$scope.robo_search_keywords){
                $scope.listarRobo();
                return;
            }

            var paginacao = {
                page: $scope.paging.current,
                start: $scope.paging.current * $scope.paging.qtde,
                limit: $scope.paging.qtde
            };

            robosFactory.pesquisarRobo(paginacao, $scope.robo_search_keywords).then(function successCallback(response){
                $scope.paging.total = Math.trunc(response.data.Quantidade.Quantidade / $scope.paging.qtde) + 1;
                $scope.robos = response.data.Content;
            }, function errorCallback(response){
                $scope.showToast(response.data.Mensagem);
            });
      }

    function DialogController($scope, $mdDialog) {
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
    
});

MyApp.directive('chooseFile', function() {
    return {
      link: function (scope, elem, attrs) {
        var button = elem.find('button');
        var input = angular.element(elem[0].querySelector('input#fileInput'));
        button.bind('click', function() {
          input[0].click();
        });
        input.bind('change', function(e) {
          scope.$apply(function() {
            var files = e.target.files;
            if (files[0]) {
              scope.arquivo = files[0];
              scope.fileName = files[0].name;
            } else {
              scope.arquivo = null;
              scope.fileName = null;
            }
          });
        });
      }
    };
  });