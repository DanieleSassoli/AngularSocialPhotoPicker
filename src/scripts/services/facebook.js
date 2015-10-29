/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularHelloJs').factory('FacebookService', ['SharedService', function (SharedService) {
  var sharedService = new SharedService('facebook');

  function getPhoto(photoId, cb) {
    sharedService.executeRequest('/me/photo', {
      id: photoId,
      fields: 'id,album,images,height,width,picture'
    }, cb);
  }

  function getPhotoForEachArrayElem(err, array, cb) {
    if(!err) {
      async.map(array, function (photo, mapCb) {
        getPhoto(photo.id, function (err, data) {
          if (!err) photo.originalPhoto = data;
          mapCb(err, photo);
        });
      }, function (err) {
        cb(err, array);
      });
    } else cb(err);
  }

  return {
    getMe: function (cb) {
      sharedService.executeRequest('/me', {}, cb);
    },
    logout: function (cb) {
      sharedService.logout(cb);
    },
    getUploadedPhotos: function (cb) {
      sharedService.executeRequest('/me/photos', {}, function (err, res) {
        getPhotoForEachArrayElem(err, res, cb);
      });
    },
    getAlbums: function (cb) {
      sharedService.executeRequest('/me/albums', {'fields': 'id,name'}, cb);
    },
    getAlbumPhotos: function (albumId, cb) {
      sharedService.executeRequest('/me/album', {id: albumId}, function(err, res){
        getPhotoForEachArrayElem(err, res, cb);
      });
    },
    getPhoto: getPhoto
  }
}]);
