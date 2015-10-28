/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory('FacebookService', [function () {
    var facebookApp;

    function getMe(cb) {
        facebookApp.api('/me').then(function (res) {
            cb(null, res);
        }, cb);
    }

    function getPhoto(photoId, cb) {
        facebookApp.api('/me/photo', {
            id: photoId,
            fields: 'id,album,images,height,width,picture'
        }).then(function (res) {
            cb(null, res.images[0])
        }, function (err) {
            cb(err);
        });
    }

    function getPhotoForEachArrayElem(array, cb) {
        async.map(array, function (photo, mapCb) {
            getPhoto(photo.id, function (err, data) {
                if (!err) photo.originalPhoto = data;
                mapCb(err, photo);
            });
        }, function (err) {
            cb(err, array);
        });
    }

    return {
        login: function (cb) {
            hello('facebook').login().then(function () {
                facebookApp = hello('facebook');
                getMe(cb);
            }, cb);
        },
        getUploadedPhotos: function (cb) {
            facebookApp.api('/me/photos').then(function (res) {
                getPhotoForEachArrayElem(res.data, cb);
            }, cb);
        },
        getAlbums: function (cb) {
            facebookApp.api('/me/albums', {'fields': 'id,name'}).then(function (res) {
                cb(null, res.data);
            }, cb);
        },
        getAlbumPhotos: function (albumId, cb) {
            facebookApp.api('/me/album', {id: albumId}).then(function (res) {
                getPhotoForEachArrayElem(res.data, cb);
            }, cb);
        },
        getMe: getMe,
        getPhoto: getPhoto
    }
}]);
