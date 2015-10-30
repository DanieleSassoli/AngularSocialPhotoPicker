angular.module('AngularSocialPhotoPicker')
  .provider('socialPhotoPicker', function socialPhotoPickerProvider() {
    this.initSocials = function (ids) {
      hello.init({
        facebook: ids.facebookId,
        instagram: ids.instagramId,
        flickr: ids.flickrId
      }, {
        scope: "photos",
        redirect_uri: 'redirect.html'
      });
    };
    this.$get = ["SocialPhotoPicker", function socialPhotoPickerFactory(SocialPhotoPicker) {
      // let's assume that the UnicornLauncher constructor was also changed to
      // accept and use the useTinfoilShielding argument
      return new socialPhotoPicker(SocialPhotoPicker, initSocials);
    }];
  });
