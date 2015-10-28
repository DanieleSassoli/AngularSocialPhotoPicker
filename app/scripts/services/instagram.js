/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory("InstagramService", [function () {
    var instagramApp;

    function getMe(cb) {
        instagramApp.api('/me').then(function (res) {
            cb(null, res);
        }, cb);
    }

    return {
        login: function (cb) {
            hello('instagram').login().then(function() {
                instagramApp = hello('instagram');
                getMe(cb);
            }, cb);
        },
        getUserPhotos: function (userId, cb) {
            instagramApp.api('friend/photos', {id: userId}).then(function(res) {
                _.map(res.data, function (item) {
                    item.originalPhoto = item.images.standard_resolution;
                });
                cb(null, res.data);
            }, cb);
        },
        getFriends: function (cb) {
            instagramApp.api('me/following').then(function(res) {
                cb(null, res.data);
            }, cb);
        },
        getMe: getMe
    };
}]);
