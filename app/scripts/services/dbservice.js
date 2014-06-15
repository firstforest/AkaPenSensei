'use strict';

angular.module('akaPenSenseiApp')
  .service('DbService', function DbService($q) {
    var that = this;
    Kii.initializeWithSite('966eb9b6', 'e0e4c26eb09772eb1f591f063162b3dd', KiiSite.JP);

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

    this.upload = function (file, title, description, callback) {
      getImageBucket().then(function (bucket) {
        var obj = bucket.createObject();
        obj.set('title', title);
        obj.set('description', description);
        obj.save({
            success: function (theObject) {
              console.log('Object saved & bucket created!', theObject);
              theObject.uploadBody(file, {
                progress: function (oEvent) {
                  if (oEvent.lengthComputable) {
                    var percentComplete = oEvent.loaded / oEvent.total;
                    //getting upload progress. You can update progress bar on this function.
                    console.log("upload percentComplete: " + percentComplete);
                  }
                },
                success: function (obj) {
                  obj.publishBody({
                    success: function (obj, publishedUrl) {
                      callback(publishedUrl);
                      console.log(publishedUrl);
                    },
                    failure: function (obj, errorString) {
                      console.log('publish failed.', errorString);
                    }
                  })
                },
                failure: function (obj, anErrorString) {
                  console.log(anErrorString);
                }
              });
            },
            failure: function (theObject, errorString) {
              console.log('Error saving object and bucket: ' + errorString);
            }
          }
        )
        ;
      });
    }
    ;
  })
;