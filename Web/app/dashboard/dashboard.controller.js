MyApp.controller('dashboardController', function ($scope, $mdDialog, $mdToast, dashboardFactory) {

    $scope.isLoading = false;

    $scope.graficoPizzaCriar = function(){

        $scope.isLoading = true;
        dashboardFactory.recuperarGraficoPizza().then(function successCallback(response){
            $scope.renderizaGraficoPizza(response.data.Content);
        }, function errorCallback(response){
            $scope.isLoading = false;
            $scope.showToast(response.data.Mensagem);
        });
    },

    $scope.renderizaGraficoPizza = function(dto){
        
        var dtoGrafico = [];

        $.each(dto, function( index, value ) {
            var dtoObj = {};

            dtoObj.name = value.DescricaoCarro;
            dtoObj.y = value.Qtde;

            dtoGrafico.push(dtoObj);
        });

        Highcharts.chart('graficoPizza', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Manobras por robô'
            },
            
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Qtde. importacoes',
                colorByPoint: true,
                data: dtoGrafico
            }]
        });

        $scope.isLoading = false;

        // Highcharts.chart('graficoBarra', {
        //     chart: {
        //         type: 'column'
        //     },
        //     title: {
        //         text: 'Monthly Average Rainfall'
        //     },
        //     subtitle: {
        //         text: 'Source: WorldClimate.com'
        //     },
        //     xAxis: {
        //         categories: [
        //             'Jan',
        //             'Feb',
        //             'Mar',
        //             'Apr',
        //             'May',
        //             'Jun',
        //             'Jul',
        //             'Aug',
        //             'Sep',
        //             'Oct',
        //             'Nov',
        //             'Dec'
        //         ],
        //         crosshair: true
        //     },
        //     yAxis: {
        //         min: 0,
        //         title: {
        //             text: 'Rainfall (mm)'
        //         }
        //     },
        //     tooltip: {
        //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        //             '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        //         footerFormat: '</table>',
        //         shared: true,
        //         useHTML: true
        //     },
        //     plotOptions: {
        //         column: {
        //             pointPadding: 0.2,
        //             borderWidth: 0
        //         }
        //     },
        //     series: [{
        //         name: 'Tokyo',
        //         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
        //     }, {
        //         name: 'New York',
        //         data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
        //     }, {
        //         name: 'London',
        //         data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
        //     }, {
        //         name: 'Berlin',
        //         data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
        //     }]
        // });

        $scope.isLoading = false;
    }
});