/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory('FacebookService', [function () {
  var facebookApp;
  function getMe (cb){
    facebookApp.api('/me').then(function (res) {
      cb(res);
    });
  }
  return {
    login: function (cb) {
      hello('facebook').login().then(function () {
        facebookApp = hello('facebook');
        getMe(cb);
      }, function (err) {
        cb("error", err);
      });
    },
    getMe: getMe,
    getUploadedPhotos: function (cb) {
      facebookApp.api('/me/photos').then(function (res) {
        cb(res.data);
      });
    },
    getAlbums: function (cb) {
      facebookApp.api('/me/albums?fields=id,name').then(cb);
    },
    getAlbumPhotos: function (albumId, cb) {
      facebookApp.api('/me/album', {id: albumId}).then(cb);
    },
    getPhoto: function (photoId, cb) {
      facebookApp.api('/me/photo', {id:photoId, fields: 'id,album,images,height,width,picture'}).then(cb);
    }
  }
}]);
