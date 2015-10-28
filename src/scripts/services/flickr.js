/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularHelloJs').factory('FlickrService', [function () {
    var flickrApp;

    function getMe(cb) {
        flickrApp.api('/me').then(function (res) {
            cb(null, res);
        }, cb);
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
        logout: function (cb) {
            flickrApp.logout().then(function () {
                cb(null);
            }, cb);
        },
        getUploadedPhotos: function (cb) {
            flickrApp.api('/me/photos').then(function (res) {
                async.map(res.data, function (item) {
                    item.originalPhoto = {url: item.picture};
                    return item;
                }, function (err) {
                    cb(err, res.data);
                });
            }, cb);
        },
        getAlbums: function (cb) {
            flickrApp.api('/me/albums').then(function (res) {
                cb(null, res.data);
            }, cb);
        },
        getAlbumPhotos: function (albumId, cb) {
            flickrApp.api('/me/album', {id: albumId}).then(function (res) {
                async.map(res.data, function (item) {
                    item.originalPhoto = {url: item.picture};
                    return item;
                }, function (err) {
                    cb(err, res.data);
                });
            }, cb);
        },
        getPhoto: function (photoId, cb) {
            flickrApp.api('/me/photo', {id: photoId}).then(function (res) {
                cb(null, res);
            }, cb);
        },
        getMe: getMe
    }
}]);
