var app = angular.module('app', [])
app.controller('DataCtrl', function ($scope,  $http) {
$scope.image = 'http://www.lawrence.io/ct/image.png';
  setInterval(function() {

    $scope.image = 'http://www.lawrence.io/ct/image.png?rand=' + Math.random();
    $scope.$apply();
}, 3000);


$scope.stop = function(){
        var url = 'stop';

        $scope.runPost(url);

    };

$scope.start = function(){
        var url = 'start';

        $scope.runPost(url);

    };


    $scope.runPost = function(url){

            $http({
            method: 'GET',
            url: url,

        }).
        success(function (data, status, headers, config) {

            console.log(headers())


        }).
        error(function (data, status, headers, config) {

        });
    };


})
