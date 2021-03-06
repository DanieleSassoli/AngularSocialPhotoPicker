(function (module) {

  'use strict';

  /**
   * @ngdoc overview
   * @name AngularSocialPhotoPicker
   * @description
   * # AngularSocialPhotoPicker
   *
   * Main module of the application.
   */

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory('FacebookService', ['SharedService', function (SharedService) {
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
            if (!err) {
              photo.originalPhoto = data.images[0];
              photo.thumbnailUrl = data.picture;
            }
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

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory('FlickrService', ['SharedService', function (SharedService) {
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
              item.thumbnailUrl = {url: item.thumbnail};
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

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory("InstagramService", ['SharedService', function (SharedService) {
    var sharedService = new SharedService('instagram');

    return {
      getMe: function (cb) {
        sharedService.executeRequest('/me', {}, cb);
      },
      logout: function (cb) {
        sharedService.logout(cb);
      },
      getUserPhotos: function (userId, cb) {
        sharedService.executeRequest('/friend/photos', {id: userId}, function(err, res){
          if(!err) {
            async.map(res, function (item, mapCb) {
              if(item.images !== undefined && item.images.standard_resolution !== undefined) {
                item.originalPhoto = item.images.standard_resolution;
                item.thumbnailUrl = item.images.thumbnail.url;
                mapCb(null, item);
              } else mapCb("something went wrong");
            }, function (err) {
              cb(err, res);
            });
          } else cb(err);
        });
      },
      getFriends: function (cb) {
        sharedService.executeRequest('me/following', {}, cb);
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
                          item.thumbnailUrl = item.previewURL;
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

  module
    .provider('socialPhotoPicker', function socialPhotoPickerProvider() {
      this.initSocials = function (config) {
        hello.init({
          facebook: config.clientIds.facebookId || '',
          instagram: config.clientIds.instagramId  || '',
          flickr: config.clientIds.flickrId  || ''
        }, {
          scope: config.scope || 'photos',
          redirect_uri: config.redirectUri || 'redirect.html',
          oauth_proxy: config.oauthProxy || 'https://auth-server.herokuapp.com/proxy'
        });
      };
      this.$get = ["SocialPhotoPicker", function socialPhotoPickerFactory(SocialPhotoPicker) {
        // let's assume that the UnicornLauncher constructor was also changed to
        // accept and use the useTinfoilShielding argument
        return new socialPhotoPicker(SocialPhotoPicker, initSocials);
      }];
    });

  /**
   * Created by Utente Amministrator on 26/10/2015.
   */
  module.factory("SharedService", [function () {
    var sharedServiceInstance = function(provider){
      this.provider = provider;
    };
    sharedServiceInstance.prototype.executeRequest = function ( url, data, cb) {
      var providerInstance = hello(this.provider);
      providerInstance.login({force: false}).then(function () {
        providerInstance.api(url, data).then(function (res) {
          cb(null, res.data || res);
        }, cb);
      }, cb);
    };
    sharedServiceInstance.prototype.logout = function(cb){
      hello(this.provider).logout().then(function () {
        cb(null);
      }, cb);
    };
    return sharedServiceInstance;
  }]);


}) (angular.module ('AngularSocialPhotoPicker', []));


