'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htdocsApp
 */
angular.module('AngularSocialPhotoPickerApp')
    .controller('FacebookCtrl', ['$scope', 'FacebookService', function ($scope, FacebookService) {
        $scope.loginStatus = {};
        $scope.loginStatus.connected = false;
        $scope.UploadedPhotos = [];
        $scope.AlbumPhotos = [];
        $scope.FacebookUploadedPhotos = function () {
            FacebookService.getUploadedPhotos(function (err, res) {
                _.forEach(res, function (photo) {
                    $scope.$apply(function () {
                        $scope.UploadedPhotos.push(photo);
                    });
                });
            });
        };

        $scope.FacebookAlbumPhotos = function () {
            FacebookService.getAlbums(function (err, res) {
                _.forEach(res, function (album) {
                    FacebookService.getAlbumPhotos(album.id, function (err, photos) {
                        _.forEach(photos, function (photo) {
                            $scope.$apply(function () {
                                $scope.AlbumPhotos.push(photo);
                            });
                        });
                    });
                });
            });
        };
    }]);
