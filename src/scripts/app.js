'use strict';

/**
 * @ngdoc overview
 * @name AngularSocialPhotoPicker
 * @description
 * # AngularSocialPhotoPicker
 *
 * Main module of the application.
 */
angular.module('AngularSocialPhotoPicker', []);/*.run(['$rootScope', function(){
    //OAuth.initialize('CDG3XUKTSepWWOuoXntTVuyYZIg');hello.init({
    hello.init({
      facebook: '890340394389709',
      instagram: '97d172d17b3240abb0fbe18280fcf9a5',
      flickr: 'eb66863342454c0c97f9513cbe4c0d28'
    }, {
      scope: "photos",
      redirect_uri: 'redirect.html'
    });
  }]);*/
