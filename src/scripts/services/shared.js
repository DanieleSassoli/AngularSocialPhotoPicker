/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularSocialPhotoPicker').factory("SharedService", [function () {
  var sharedServiceInstance = function(provider){
    this.provider = provider;
  };
  sharedServiceInstance.prototype.executeRequest = function ( url, data, cb) {
    var providerInstance = hello(this.provider);
    providerInstance.login({force: false}).then(function () {
      providerInstance.api(url, data).then(function (res) {
        cb(null, res.data || res.images[0]);
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
