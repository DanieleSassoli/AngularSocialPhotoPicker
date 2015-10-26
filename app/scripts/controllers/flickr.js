angular.module('htdocsApp').controller('FlickrCtrl', ['$scope', 'FlickrService', function ($scope, FlickrService) {
    $scope.loginStatus = {};
    $scope.loginStatus.connected = false;
    $scope.searchTerms = {};
    $scope.searchTerms.q = "prova";
    $scope.flickrPics = [];
    $scope.login = function () {
        FlickrService.login(function (data) {
            $scope.$apply(function () {
                $scope.loginStatus.connected = data;
            });
        });
    };
    $scope.search = function () {
        FlickrService.search($scope.searchTerms.q, function (data) {
            $scope.$apply(function () {
                $scope.flickrPics = data;
            });
        });
    };
    $scope.getPhotoUrl = function (photo) {
        return FlickrService.getPhotoUrl(photo);
    }
}]);