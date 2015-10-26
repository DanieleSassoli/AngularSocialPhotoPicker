/**
 * Created by Utente Amministrator on 23/10/2015.
 */
angular.module('htdocsApp').factory('PixabayService', ['$http', function($http){
        return {
            getPhotos: function(about, cb){
                $http.get('https://pixabay.com/api/?username=alanmastro&key=7cc39f4a75777bba7af8&response_group=high_resolution&q=' + about +'&image_type=photo').then(
                    function(data){
                        cb("success", data);
                    },
                    function(err){
                        cb("error", err);
                    }
                );
            }
        }
    }]);
