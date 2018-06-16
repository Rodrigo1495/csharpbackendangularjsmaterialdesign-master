MyApp.controller('robosController', function ($scope, $mdDialog, $mdToast, robosFactory) {

    $scope.currentPage = 0;

    $scope.paging = {
        total: 1,
        current: 1,
        onPageChanged: loadPages,
        qtde: 5
    };

    function loadPages() {
        
        $scope.currentPage = $scope.paging.current;
        if(!$scope.robo_search_keywords){
            $scope.listarRobo();
        }else{
            $scope.pesquisarRobo();
        }
        
    };

    $scope.showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(2000)
                .position("top left")
        );
    },

    $scope.listarRobo = function () {
        
        var paginacao = {
            page: $scope.paging.current,
            start: $scope.paging.current * $scope.paging.qtde,
            limit: $scope.paging.qtde
        };
        
        robosFactory.listarRobo(paginacao).then(function successCallback(response) {
            $scope.paging.total = Math.trunc(response.data.Quantidade.Quantidade / $scope.paging.qtde) + 1;
            $scope.robos = response.data.Content;
        }, function errorCallback(response) {
            $scope.showToast(response.data.Message);
        });

    },

    $scope.showNovoRoboForm = function (event) {
        $scope.clearRobosForm();
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/robos/cadastro_robos.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        });
    },

    $scope.salvarRobo = function () {

        robosFactory.salvarRobo($scope).then(function successCallback(response) {
          
            $scope.showToast(response.data.Mensagem);

            // refresh the list
            $scope.listarRobo();

            // close dialog
            $scope.cancel();

            // remove form values
            $scope.clearRobosForm();

        }, function errorCallback(response) {
            $scope.showToast(response.data.Mensagem);
            $scope.clearRobosForm();
        });
    },

    $scope.clearRobosForm = function () {
        $scope.Id = "";
        $scope.Descricao = "";
        $scope.MacAddress = "";
    },

    $scope.editarRobo = function (id) {

        // get robo to be edited
        robosFactory.editarRobo(id).then(function successCallback(response) {

            // put the values in form
            $scope.Id = response.data.Content.Id;
            $scope.Descricao = response.data.Content.Descricao;
            $scope.MacAddress = response.data.Content.MacAddress;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/robos/cadastro_robos.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function () { },

                // user clicked 'Cancel'
                function () {
                    $scope.clearRobosForm();
                }
            );

        }, function errorCallback(response) {
            $scope.showToast(response.data.Mensagem);
        });

    },

    $scope.removerRobo = function (event, id) {

        $scope.Id = id;

        var confirm = $mdDialog.confirm()
            .title('Pergunta')
            .textContent('Deseja remover o robô?')
            .targetEvent(event)
            .ok('Sim')
            .cancel('Não');

        $mdDialog.show(confirm).then(

            function () {
                $scope.confirmaRemoverRobo();
            },

            function () {
                // hide dialog
            }
        );
    },

    $scope.confirmaRemoverRobo = function(){

        robosFactory.removerRobo($scope.Id).then(function successCallback(response){
      
          $scope.showToast(response.data.Mensagem);
      
          $scope.listarRobo();
      
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