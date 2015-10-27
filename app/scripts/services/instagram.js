/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory("InstagramService", ['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
  var instagaramApiBaseUrl = "https://api.instagram.com/v1/users/";
  var instagramApp;
  var accessToken;

  function executeRequest(url, cb) {
    instagramApp.api(url).then(function(res){
      cb("success", res.data);
    }, function(err){
      cb("error", err);
    });
  }

  return {
    login: function (cb) {
      hello('instagram').login().then(function () {
        //accessToken = instagram.access_token;
        instagramApp = hello('instagram');
        cb(true);
      }, function (err) {
        cb(false);
      });
    },
    getUserPhotos: function (userId, cb) {
      executeRequest('me/photos', cb);
    },
    getFriends: function (cb) {
      executeRequest('me/following', cb);
    },
    getFriends: function (cb) {
      executeRequest('me/', cb);
    }
  };
}]);
