'use strict';

angular.module('akaPenSenseiApp')
  .service('DbService', function DbService($q) {
    var that = this;

    function getCurrentUser() {
      var d = $q.defer();
      if (that.user) {
        d.resolve(that.user);
      } else {
        var username = 'test';
        var password = 'test';
        KiiUser.authenticate(username, password, {
          success: function (theUser) {
            console.log('User authenticated!');
            console.log(theUser);
            that.user = theUser;
            d.resolve(theUser);
          },
          failure: function (theUser, errorString) {
            console.log('Error authenticating: ' + errorString);
            d.reject();
          }
        });
      }
      return d.promise;
    }

    function getImageBucket() {
      var d = $q.defer();
      getCurrentUser().then(function (user) {
        d.resolve(user.bucketWithName('image'));
      });
      return d.promise;
    }

    this.upload = function (file, title, description) {
      var obj = getImageBucket().createObject();
      obj.set('title', 'title');
      obj.set('description', '説明');
      obj.save({
        success: function (theObject) {
          console.log("Object saved & bucket created!");
        },
        failure: function (theObject, errorString) {
          console.log("Error saving object and bucket: " + errorString);
        }
      });
    };
  });