/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularSocialPhotoPickerApp').controller('InstagramCtrl', ['$scope', 'InstagramService', function ($scope, InstagramService) {
    //<==== INSTAGRAM ====>
    $scope.pics = [];
    $scope.loginStatus = {};
    $scope.loginStatus.connected = false;
    $scope.InstagramPhotos = function () {
        InstagramService.getUserPhotos("self", function (status, pics) {
            $scope.$apply(function () {
                $scope.pics = pics;
            });
        });
        InstagramService.getFriends(function (status, followed) {
            $scope.$apply(function () {
                $scope.followed = followed;
            });
        });
    };
}]);
