/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularHelloJs').factory('FlickrService', ['SharedService', function (SharedService) {
  var sharedService = new SharedService('flickr');
  return {
    getMe: function (cb) {
      sharedService.executeRequest('/me', {}, cb);
    },
    logout: function (cb) {
      sharedService.logout(cb);
    },
    getUploadedPhotos: function (cb) {
      sharedService.executeRequest('/me/photos', {}, function(err, res){
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
      sharedService.executeRequest('/me/albums', {}, cb);
    },
    getAlbumPhotos: function (albumId, cb) {
      sharedService.executeRequest('/me/album', {id: albumId}, function(err, res){
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
      sharedService.executeRequest('/me/photo', {id: photoId}, cb);
    }
  }
}]);
