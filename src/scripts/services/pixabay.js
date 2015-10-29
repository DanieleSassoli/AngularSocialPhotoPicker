/**
 * Created by Utente Amministrator on 23/10/2015.
 */
angular.module('AngularSocialPhotoPicker').factory('PixabayService', ['$http', function ($http) {
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
