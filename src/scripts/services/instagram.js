/**
 * Created by Utente Amministrator on 26/10/2015.
 */
angular.module('AngularSocialPhotoPicker').factory("InstagramService", ['SharedService', function (SharedService) {
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
