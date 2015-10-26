/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').controller('InstagramCtrl', ['$scope', 'InstagramService', function ($scope, InstagramService) {
  //<==== INSTAGRAM ====>
  $scope.pics = [];
  $scope.loginStatus = {};
  $scope.loginStatus.connected = false;
  $scope.InstagramLogin = function () {
    InstagramService.login(function(status){
      $scope.loginStatus.connected = status;
    });
  };
  $scope.InstagramPhotos = function () {
    InstagramService.getUserPhotos("self", function(status,pics){
      $scope.pics = pics;
    });
    InstagramService.getFriends(function(status, followed){
      $scope.followed = followed;
    });
  };
}]);
