/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularHelloJs').factory("InstagramService", [function () {

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
