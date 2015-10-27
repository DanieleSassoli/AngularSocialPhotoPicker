/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory('FlickrService', [function () {
  var flickrApp;
  return {
    login: function (cb) {
      hello('flickr').login().then(function () {
        flickrApp = hello('flickr');
        cb(true);
      }, function (err) {
        cb(false);
      });
    },
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
