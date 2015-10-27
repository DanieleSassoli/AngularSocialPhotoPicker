/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory("InstagramService", [function () {
  var instagramApp;
  function executeRequest(url, data, cb) {
    instagramApp.api(url, data).then(function(res){
      cb("success", res.data);
    }, function(err){
      cb("error", err);
    });
  }

  return {
    login: function (cb) {
      hello('instagram').login().then(function () {
        instagramApp = hello('instagram');
        cb(true);
      }, function (err) {
        cb(false);
      });
    },
    getUserPhotos: function (userId, cb) {
      executeRequest('friend/photos', {id: userId}, cb);
    },
    getFriends: function (cb) {
      executeRequest('me/following', {}, cb);
    }
  };
}]);
