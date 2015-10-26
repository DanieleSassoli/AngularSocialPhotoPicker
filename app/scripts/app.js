'use strict';

/**
 * @ngdoc overview
 * @name htdocsApp
 * @description
 * # htdocsApp
 *
 * Main module of the application.
 */
angular
  .module('htdocsApp', []).run(['$rootScope', function(){
    OAuth.initialize('CDG3XUKTSepWWOuoXntTVuyYZIg');
  }]);
