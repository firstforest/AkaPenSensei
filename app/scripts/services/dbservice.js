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

    function getAkapenBucket() {
      var d = $q.defer();
      getCurrentUser().then(function (user) {
        d.resolve(user.bucketWithName('akapen'));
      });
      return d.promise;
    }

    this.getAllImageSrcList = function () {
      var d = $q.defer();
      var list = [];
      getImageBucket().then(function (bucket) {
        var queryCallbacks = {
          success: function (queryPerformed, resultSet, nextQuery) {
            for (var i = 0; i < resultSet.length; i++) {
              resultSet[i].publishBody({
                success: function (obj, publishedUrl) {
                  d.notify(publishedUrl)
                  list.push(publishedUrl);
                },
                failure: function (obj, errorString) {
                  console.log('publish failed.', errorString);
                }
              })
            }
            if (nextQuery != null) {
              // There are more results (pages).
              // Execute the next query to get more results.
              bucket.executeQuery(nextQuery, queryCallbacks);
            }
          },
          failure: function (queryPerformed, anErrorString) {
            console.log('error query', queryPerformed, anErrorString);
          }
        };
        bucket.executeQuery(null, queryCallbacks);
      });
      return d.promise;
    };

    this.getAllContentList = function () {
      var d = $q.defer();
      getImageBucket().then(function (bucket) {
        var queryCallbacks = {
          success: function (queryPerformed, resultSet, nextQuery) {
            for (var i = 0; i < resultSet.length; i++) {
              resultSet[i].publishBody({
                success: function (obj, publishedUrl) {
                  var content = {
                    src: publishedUrl,
                    id: obj.objectURI()
                  };
                  d.notify(content);
                },
                failure: function (obj, errorString) {
                  console.log('publish failed.', errorString);
                }
              })
            }
            if (nextQuery != null) {
              // There are more results (pages).
              // Execute the next query to get more results.
              bucket.executeQuery(nextQuery, queryCallbacks);
            }
          },
          failure: function (queryPerformed, anErrorString) {
            console.log('error query', queryPerformed, anErrorString);
          }
        };
        bucket.executeQuery(null, queryCallbacks);
      });
      return d.promise;
    };

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
        });
      });
    };
    this.saveAkapenData = function (data) {
      getAkapenBucket().then(function (bucket) {
        var obj = bucket.createObject();
        obj.set('contentId', data.contentId);
        obj.set('comment', data.comment);
        obj.set('akapen', data.akapen);
        obj.save({
          success: function (obj) {
            console.log(obj);
          },
          failure: function () {

          }
        })
      });
    }
  });