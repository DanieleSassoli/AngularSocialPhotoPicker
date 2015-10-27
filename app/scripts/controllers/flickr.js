angular.module('htdocsApp').controller('FlickrCtrl', ['$scope', 'FlickrService', function ($scope, FlickrService) {
  $scope.loginStatus = {};
  $scope.loginStatus.connected = false;
  $scope.searchTerms = {};
  $scope.flickrPics = [];
  $scope.flickrAlbumPics = [];
  $scope.login = function () {
    FlickrService.login(function (connected) {
      $scope.$apply(function () {
        $scope.loginStatus.connected = connected != "error";;
      });
    });
  };
  $scope.getPhotos = function () {
    FlickrService.getUploadedPhotos(function (photos) {
      _.forEach(photos, function (photo) {
        $scope.$apply(function () {
          $scope.flickrPics.push(photo);
        });
      });
    });
  };
  $scope.getAlbums = function () {
    FlickrService.getAlbums(function (res) {
      _.forEach(res.data, function (album) {
        FlickrService.getAlbumPhotos(album.id, function (photos) {
          _.forEach(photos.data, function (photo) {
            $scope.$apply(function () {
              $scope.flickrAlbumPics.push(photo);
            });
          });
        });
      });
    });
  };
}]);
