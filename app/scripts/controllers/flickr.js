angular.module('htdocsApp').controller('FlickrCtrl', ['$scope', 'FlickrService', function ($scope, FlickrService) {
  $scope.loginStatus = {};
  $scope.loginStatus.connected = false;
  $scope.searchTerms = {};
  $scope.flickrPics = [];
  $scope.flickrAlbumPics = [];
  $scope.login = function () {
    FlickrService.login(function (data) {
      $scope.$apply(function () {
        $scope.loginStatus.connected = data;
      });
    });
  };
  $scope.getPhotos = function () {
    FlickrService.getUploadedPhotos(function (photos) {
      _.forEach(photos, function (photo) {
        $scope.$apply(function () {
          $scope.flickrPics.push(photo);
        });
        /*FlickrService.getPhoto(item.id, function (data) {
          $scope.$apply(function () {
            $scope.flickrPics.push(data);
          });
        });*/
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
            /*FlickrService.getPhoto(photo.id, function (photoInfo) {
              $scope.$apply(function () {
                $scope.flickrAlbumPics.push(photoInfo.images[0]);
              });
            });*/
          });
        });
      });
    });
  };
}]);
