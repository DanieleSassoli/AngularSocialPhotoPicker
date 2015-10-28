(function (module) {

  'use strict';

  /**
   * @ngdoc overview
   * @name AngularHelloJs
   * @description
   * # AngularHelloJs
   *
   * Main module of the application.
   */
  module.run(['$rootScope', function(){
      //OAuth.initialize('CDG3XUKTSepWWOuoXntTVuyYZIg');hello.init({
      hello.init({
        facebook: '890340394389709',
        instagram: '97d172d17b3240abb0fbe18280fcf9a5',
        flickr: 'eb66863342454c0c97f9513cbe4c0d28'
      }, {
        scope: "photos",
        redirect_uri: '/redirect.html',
        oauth_proxy: 'http://localhost:3000/oauthproxy'
      });
    }]);

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory('FacebookService', [function () {
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

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory('FlickrService', [function () {
    var flickrApp;
    function getMe (cb){
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
      getUploadedPhotos: function (cb) {
        flickrApp.api('/me/photos').then(function (res) {
            async.map(res.data, function(item){
                item.originalPhoto = {url: item.picture};
                return item;
            },function(err){
                cb(err, res.data);
            });
        }, cb);
      },
      getAlbums: function (cb) {
        flickrApp.api('/me/albums').then(function(res){
            cb(null, res.data);
        }, cb);
      },
      getAlbumPhotos: function (albumId, cb) {
        flickrApp.api('/me/album', {id: albumId}).then(function(res){
            async.map(res.data, function(item){
                item.originalPhoto = {url: item.picture};
                return item;
            },function(err){
                cb(err, res.data);
            });
        }, cb);
      },
      getPhoto: function (photoId, cb) {
        flickrApp.api('/me/photo', {id:photoId}).then(function(res){
            cb(null, res);
        }, cb);
      },
      getMe: getMe
    }
  }]);

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory("InstagramService", [function () {
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
                  async.map(res.data, function (item) {
                      return item.originalPhoto = item.images.standard_resolution;
                  },function(err){
                      cb(err, res.data);
                  });
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

  /**
   * Created by Utente Amministrator on 23/10/2015.
   */
  module.factory('PixabayService', ['$http', function ($http) {
      return {
          getPhotos: function (about, cb) {
              $http.get('https://pixabay.com/api/?username=alanmastro&key=7cc39f4a75777bba7af8&response_group=high_resolution&q=' + about + '&image_type=photo').then(
                  function (res) {
                      async.map(res.data.hits, function(item){
                          item.originalPhoto = {
                              width: item.imageWidth,
                              height: item.imageHeight,
                              url: item.imageURL
                          };
                          return item;
                      }, function(err){
                          cb(err, res.data);
                      });
                  },
                  function (err) {
                      cb(err);
                  }
              );
          }
      }
  }]);


}) (angular.module ('AngularHelloJs', []));


