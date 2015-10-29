# AngularSocialPhotoPicker

This Module is intented to provide an easy access to the photos on various social networks(Facebook, Instagram, Flickr 
and Pixabay for the moment beeing...). It's based on [HelloJs] (https://adodson.com/hello.js/)

## Installation
 You can easly install AngularSocialPhotoPicker with 
 
 > bower install AngularSocialPhotoPicker
 
 this will install the package itself and the dependencies which are Angular and [async](https://github.com/caolan/async).
 Include Angular and async before including the package, then inject it into your main module 
 
 > angular.module('yourModule', ['AngularSocialPhotoPicker']);
 
 Now you can use the service provided, which are: 
 
 * FacebookService
 * InstagramService
 * PixabayService
 * FlickrService
 
Each service expose different methods depending on what each social network api provides. I will try to keep this method
as standard as possible. For the moment, every photo item you retrieve will provide you with an originalPhoto property,
containing width, height and a static url to the hres photo, and then a thumbnailUrl property with an static url to the
thumbnail of the image. 

There is no need to login in specific social network, AngularSocialPhotoPicker will automatically login if possibile when
you try calling one of the methods provided by each service.

All the methods have a standard response structure, it is based on callback, so to retrieve the data from whatever 
method call <whateverservice>.<whatevermethod>(function(err, res){}; err will be null if no error has been reported, 
otherwise it will contain the encountered error.







