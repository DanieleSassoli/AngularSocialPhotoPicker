/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').controller('InstagramCtrl', ['$scope', 'InstagramService', function ($scope, InstagramService) {
    //<==== INSTAGRAM ====>
    $scope.pics = [];
    $scope.loginStatus = {};
    $scope.loginStatus.connected = false;
    $scope.InstagramLogin = function () {
        InstagramService.login(function (err, connected) {
            $scope.$apply(function () {
                $scope.loginStatus.connected = err == null;
                $scope.loginStatus.me = connected;
            });
        });
    };
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
