angular.module('htdocsApp').controller('FlickrCtrl', ['$scope', 'FlickrService', function ($scope, FlickrService) {
  $scope.loginStatus = {};
  $scope.loginStatus.connected = false;
  $scope.searchTerms = {};
  $scope.flickrPics = [];
  $scope.flickrAlbumPics = [];
  $scope.login = function () {
    FlickrService.login(function (err, connected) {
      $scope.$apply(function () {
        $scope.loginStatus.connected = err == null;
        $scope.loginStatus.me = connected;
      });
    });
  };
  $scope.getPhotos = function () {
    FlickrService.getUploadedPhotos(function (err, photos) {
      _.forEach(photos, function (photo) {
        $scope.$apply(function () {
          $scope.flickrPics.push(photo);
        });
      });
    });
  };
  $scope.getAlbums = function () {
    FlickrService.getAlbums(function (err, res) {
      _.forEach(res, function (album) {
        FlickrService.getAlbumPhotos(album.id, function (err, photos) {
          _.forEach(photos, function (photo) {
            $scope.$apply(function () {
              $scope.flickrAlbumPics.push(photo);
            });
          });
        });
      });
    });
  };
}]);
