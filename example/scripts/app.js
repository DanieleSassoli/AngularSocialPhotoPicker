'use strict';

/**
 * @ngdoc overview
 * @name htdocsApp
 * @description
 * # htdocsApp
 *
 * Main module of the application.
 */
angular.module('AngularSocialPhotoPickerApp', ['AngularSocialPhotoPicker']).config(['socialPhotoPickerProvider', function(socialPhotoPickerProvider){
  socialPhotoPickerProvider.initSocials({clientIds: {
    facebooId: '890340394389709',
    instagramId: '97d172d17b3240abb0fbe18280fcf9a5',
    flickId: 'eb66863342454c0c97f9513cbe4c0d28'
  },
    scope: 'photos',
    redirectUri: 'redirect.html',
    oauthProxy: 'http://localhost:8088/pushApplicationCredential'
  });
}]);
