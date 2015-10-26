/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory("InstagramService", ['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
  var instagaramApiBaseUrl = "https://api.instagram.com/v1/users/";
  var instagramApp;
  var accessToken;

  function executeRequest(url, cb) {
    instagramApp.get(url).then(function(res){
      cb("success", res.data);
    }, function(err){
      cb("error", err);
    });
  }

  return {
    login: function (cb) {
      OAuth.popup('instagram').then(function (instagram) {
        accessToken = instagram.access_token;
        instagramApp = instagram;
        cb(true);
      }, function (err) {
        cb(false);
      });
    },
    getUserPhotos: function (userId, cb) {
      var url = instagaramApiBaseUrl + userId + '/media/recent/?access_token=' + accessToken;
      executeRequest(url, cb);
    },
    getFriends: function (cb) {
      var url = instagaramApiBaseUrl + 'self/follows/?access_token=' + accessToken;
      executeRequest(url, cb);
    }
  };
}]);
