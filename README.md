# AngularSocialPhotoPicker

This Module is intented to provide an easy access to the photos on various social networks(Facebook, Instagram, Flickr 
and Pixabay for the moment beeing...). It's based on [HelloJs] (https://adodson.com/hello.js/)

## Installation
 You can easly install AngularSocialPhotoPicker with 
 
``` bower install AngularSocialPhotoPicker ```
 
 this will install the package itself and the dependencies which are Angular and [async](https://github.com/caolan/async).
 
## Usage
 
 Include Angular and async before including the package
 
``` <script src="/path/to/dist/build/AngularSocialPhotoPicker.js"></script> ```
 
 Then inject it into your main module
 
``` angular.module('yourModule', ['AngularSocialPhotoPicker']); ```

  Then you will need to configure the client_id for each social you intend to use. You can do this when configuring your module
  in app.js
  
  ```
  angular.module('AngularSocialPhotoPickerApp', ['AngularSocialPhotoPicker']).config(['socialPhotoPickerProvider', function(socialPhotoPickerProvider){
    socialPhotoPickerProvider.initSocials({
      facebooId: 'YOUR_FACEBOOK_CLIENT_ID',
      instagramId: 'YOUR_INSTAGRAM_CLIENT_ID',
      flickId: 'YOUR_FLICKR_CLIENT_ID'
    });
  }]);
  ```
To configure your client ids please refer to [HelloJs] (https://adodson.com/hello.js/) documentation.
 
Now you can use the service provided, which are: 
 
 * FacebookService
 * InstagramService
 * PixabayService
 * FlickrService
 
Each service expose different methods depending on what each social network api provides. I will try to keep this method
as standard as possible. ** Every photo item you retrieve will provide you with an originalPhoto property,
containing width, height and a static url to the hres photo, and then a thumbnailUrl property with an static url to the
thumbnail of the image. **

There is no need to login in specific social network, AngularSocialPhotoPicker will automatically login if possibile when
you try calling one of the methods provided by each service.

All the methods have a standard response structure, it is based on callback, so to retrieve the data from whatever 
method call ```<whateverservice>.<whatevermethod>(function(err, res){};``` err will be null if no error has been reported, 
otherwise it will contain the encountered error.

You just need to inject the service for the desired platform in you controller

```javascript
.controller('FacebookCtrl', ['$scope', 'FacebookService', function ($scope, FacebookService) {
  $scope.FacebookUploadedPhotos = function () {
    FacebookService.getUploadedPhotos(function (err, res) {
      _.forEach(res, function (photo) {
        $scope.$apply(function () {
            $scope.UploadedPhotos.push(photo);
        });
      });
    });
  }; 
```

###Facebook Service Methods
 This are the Facebook Service Methods
 - **getMe** — returns the information on the user. The only parameter will be the callback
 - **logout** — logouts the current user, (this means that on the next call, AngularSocialPhotoPicker will automatically login,
 if possibile. The only parameter will be the callback
 - **getUploadedPhotos** — returns an array of photos uploaded directly by the user. The only parameter will be the callback 
 - **getAlbums** — returns all the albums that the user has access too, but not the photos. The only parameter will be the callback
 - **getAlbumPhotos** — returns the photos for a specific album. The firt parameter will be the albumId (retrievable via the
 getAlbums method), the second parameter will be the callback. 
 
###Instagram Service Methods
 This are the Instagram Service Methods
  - **getMe** — returns the information on the user. The only parameter will be the callback
  - **logout** — logouts the current user, (this means that on the next call, AngularSocialPhotoPicker will automatically login,
  if possibile. The only parameter will be the callback
  - **getUserPhotos** — Returns all photos of a specific user. The first parameter will be the user id, ("self" in case
  you want the photos of the current logged in user, or the user id, retrievable via the getFriends method),
  the second parameter will be the callback.
  - **getFriends** — returns all the people followed by the currently logged in user.
   
###Pixabay Service Methods
 [Pixabay](https://pixabay.com/it/) is an international community for sharing quality public domain images, so I thought that
 it would have been sensible to integrate this platform, which isn't really a social network. 
 there is only one method: 
 - **getPhotos** — it will return all the photos that hit the search criteria you are looking for. the first parameter will 
 be the search string, the second will be calback.
 
###Flickr Service Methods 
 Flickr maybe the more problematic one. You will need to create a server(or you can use the very esy [auth-serve](https://auth-server.herokuapp.com/#-auth-server)
 provided by hellojs) so that we can login when required. 
 You will also need to put the file ```redirect.html``` so that it can be hit by the flickr callback url. 
 The flickr service exposes the following methods: 
  - **getMe** — returns the information on the user. The only parameter will be the callback
  - **logout** — logouts the current user, (this means that on the next call, AngularSocialPhotoPicker will automatically login,
  if possibile. The only parameter will be the callback
  - **getUploadedPhotos** — That will return all the photos uploaded by the user. The only parameter will be the callback. 
  - **getAlbums** — That will return the list of albums created by the user. The only parameter will be the callback.
  - **getAlbumPhotos** — Will return the photos of the intended album. The first parameter will be the albumId, the second
  parameter will be the callback.
  - **getPhoto** — Returns the information on a specific photo. The first parameter will be the albumId, the second
  parameter will be the callback.
 
  














