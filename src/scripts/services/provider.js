angular.module('AngularSocialPhotoPicker')
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
