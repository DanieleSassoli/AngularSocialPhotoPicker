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
        hello('facebook').logout({force: false}).then(function () {
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

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory('FlickrService', [function () {
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

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory("InstagramService", [function () {

    function executeRequest(url, data, cb) {
      hello('instagram').login({force: false}).then(function () {
        hello('instagram').api(url, data).then(function (res) {
          cb(null, res.data);
        }, cb);
      }, cb);
    }

    return {
      getMe: function (cb) {
        executeRequest('/me', {}, cb);
      },
      logout: function (cb) {
        hello('instagram').logout().then(function () {
          cb(null);
        }, cb);
      },
      getUserPhotos: function (userId, cb) {
        executeRequest('/friend/photos', {id: userId}, function(err, res){
          if(!err) {
            async.map(res, function (item, mapCb) {
              if(item.images !== undefined && item.images.standard_resolution !== undefined) {
                item.originalPhoto = item.images.standard_resolution;
                mapCb(null, item);
              } else mapCb("something went wrong");
            }, function (err) {
              cb(err, res);
            });
          } else cb(err);
        });
      },
      getFriends: function (cb) {
        executeRequest('me/following', {}, cb);
      }
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
                      async.map(res.data.hits, function(item, mapCb){
                          item.originalPhoto = {
                              width: item.imageWidth,
                              height: item.imageHeight,
                              url: item.imageURL
                          };
                          mapCb(null, item);
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


