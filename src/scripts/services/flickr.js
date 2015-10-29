/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularHelloJs').factory('FlickrService', [function () {
  var flickrApp;

  function executeRequest(url, data, cb) {
    hello('flickr').login({force: false}).then(function () {
      hello('flickr').api(url, data).then(function (res) {
        cb(null, res.data);
      }, cb);
    }, cb);
  }

  return {
    getMe: function (cb) {
      executeRequest('/me', {}, cb);
    },
    logout: function (cb) {
      flickrApp.logout().then(function () {
        cb(null);
      }, cb);
    },
    getUploadedPhotos: function (cb) {
      executeRequest('/me/photos', {}, function(err, res){
        if(!err) {
          async.map(res, function (item, mapCb) {
            item.originalPhoto = {url: item.picture};
            mapCb(null, item);
          }, function (err) {
            cb(err, res);
          });
        } else cb(err);
      })
    },
    getAlbums: function (cb) {
      executeRequest('/me/albums', {}, cb);
    },
    getAlbumPhotos: function (albumId, cb) {
      executeRequest('/me/album', {id: albumId}, function(err, res){
        if(!err) {
          async.map(res.data, function (item, mapCb) {
            item.originalPhoto = {url: item.picture};
            mapCb(null, item);
          }, function (err) {
            cb(err, res.data);
          });
        } else cb(err);
      });
    },
    getPhoto: function (photoId, cb) {
      executeRequest('/me/photo', {id: photoId}, cb);
    }
  }
}]);
