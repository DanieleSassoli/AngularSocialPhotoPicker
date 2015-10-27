/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory('FlickrService', [function () {
  var flickrApp;
  function getMe (cb){
    flickrApp.api('/me').then(function (res) {
      cb(res);
    });
  }
  return {
    login: function (cb) {
      hello('flickr').login().then(function () {
        flickrApp = hello('flickr');
        getMe(cb);
      }, function (err) {
        cb("error", err);
      });
    },
    getme: getMe,
    getUploadedPhotos: function (cb) {
      flickrApp.api('/me/photos').then(function (res) {
        cb(res.data);
      });
    },
    getAlbums: function (cb) {
      flickrApp.api('/me/albums').then(cb);
    },
    getAlbumPhotos: function (albumId, cb) {
      flickrApp.api('/me/album', {id: albumId}).then(cb);
    },
    getPhoto: function (photoId, cb) {
      flickrApp.api('/me/photo', {id:photoId}).then(cb);
    }
  }
}]);
