'use strict';

/**
 * @ngdoc function
 * @name mytodo1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodo1App
 */
angular.module('AngularSocialPhotoPickerApp').controller('PixabayCtrl', ['$scope', 'PixabayService', function ($scope, PixabayService) {
    //<==== PIXABAY ====>
    $scope.pixabay = {};
    $scope.pixabay.q = "prova";
    $scope.getPixabayPhotos = function () {
        PixabayService.getPhotos($scope.pixabay.q, function (status, photos) {
                $scope.pixabayPics = photos.hits;
        });
    };
}]);

