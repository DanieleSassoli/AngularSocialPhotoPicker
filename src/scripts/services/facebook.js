/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularHelloJs').factory('FacebookService', [function () {

  function executeRequest(url, data, cb) {
    hello('facebook').login({force: false}).then(function () {
      hello('facebook').api(url, data).then(function (res) {
        cb(null, res.data);
      }, cb);
    }, cb);
  }

  function getPhoto(photoId, cb) {
    hello('facebook').api('/me/photo', {
      id: photoId,
      fields: 'id,album,images,height,width,picture'
    }).then(function (res) {
      cb(null, res.images[0])
    }, function (err) {
      cb(err);
    });
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
      executeRequest('/me', {}, cb);
    },
    logout: function (cb) {
      hello('facebook').logout().then(function () {
        cb(null);
      }, cb);
    },
    getUploadedPhotos: function (cb) {
      executeRequest('/me/photos', {}, function (err, res) {
        getPhotoForEachArrayElem(err, res, cb);
      });
    },
    getAlbums: function (cb) {
      executeRequest('/me/albums', {'fields': 'id,name'}, cb);
    },
    getAlbumPhotos: function (albumId, cb) {
      executeRequest('/me/album', {id: albumId}, function(err, res){
        getPhotoForEachArrayElem(err, res, cb);
      });
    },
    getPhoto: getPhoto
  }
}]);
