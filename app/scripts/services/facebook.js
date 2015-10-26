/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory('FacebookService', [function () {
  var facebookApp;
  return {
    login: function (cb) {
      OAuth.popup('facebook').then(function (facebook) {
        facebookApp = facebook;
        cb(true);
      }).fail(function (err) {
        cb(false);
      });
    },
    getUploadedPhotos: function (cb) {
      facebookApp.get('/me/photos').then(function (res) {
        cb(res.data);
      });
    },
    getAlbums: function (cb) {
      facebookApp.get('/me/albums?fields=id,name').then(cb);
    },
    getAlbumPhotos: function (albumId, cb) {
      facebookApp.get('/' + albumId + '/photos').then(cb);
    },
    getPhoto: function (id, cb) {
      facebookApp.get('/' + id + '?fields=id,album,images,height,width,picture').then(cb);
    }
  }
}]);
