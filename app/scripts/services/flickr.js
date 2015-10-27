/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('htdocsApp').factory('FlickrService', [function () {
    var FlickrApp, oauth_token, oauth_token_secret;
    return {
        login: function (cb) {
          hello('flickr').login().then(function () {
                //oauth_token = flickr.oauth_token;
                //oauth_token_secret = flickr.oauth_token_secret;
                FlickrApp = hello('flickr');
                cb(true);
            }, function (err) {
                cb(false);
            });
        },
        search: function (q, cb) {
            FlickrApp.get({
                url: 'https://api.flickr.com/services/rest',
                data: {
                    text: q,
                    nojsoncallback: 1,
                    oauth_token: oauth_token,
                    method: 'flickr.photos.search'
                }
            }).then(function (res) {
                    cb(res.photos.photo);
                },
                function (err) {
                    cb(err);
                });
        },
        getPhotoUrl: function(photoObj){
            return "https://farm" + photoObj.farm + ".staticflickr.com/" + photoObj.server + "/" + photoObj.id + "_" + photoObj.secret + "_b.jpg";
        }
    }
}]);
