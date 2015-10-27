'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
    .controller('FacebookCtrl', ['$scope', 'FacebookService', function ($scope, FacebookService) {
        $scope.loginStatus = {};
        $scope.loginStatus.connected = false;
        $scope.UploadedPhotos = [];
        $scope.AlbumPhotos = [];
        $scope.FacebookLogin = function () {
            FacebookService.login(function (connected) {
                $scope.$apply(function () {
                    $scope.loginStatus.connected = connected;
                });
            });
        };
        $scope.FacebookUploadedPhotos = function () {
            FacebookService.getUploadedPhotos(function (res) {
                _.forEach(res, function (item) {
                    FacebookService.getPhoto(item.id, function (data) {
                        $scope.$apply(function () {
                            $scope.UploadedPhotos.push(data.images[0]);
                        });
                    });
                });
            });
        };

        $scope.FacebookAlbumPhotos = function () {
            FacebookService.getAlbums(function (res) {
                _.forEach(res.data, function (album) {
                    FacebookService.getAlbumPhotos(album.id, function (photos) {
                        _.forEach(photos.data, function (photo) {
                            FacebookService.getPhoto(photo.id, function (photoInfo) {
                                $scope.$apply(function () {
                                    $scope.AlbumPhotos.push(photoInfo.images[0]);
                                });
                            });
                        });
                    });
                });
            });
        };
    }]);
