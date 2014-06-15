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

    function notifyContent(obj, d) {
      var contentId = obj.objectURI();
      obj.publishBody({
        success: function (obj, publishedUrl) {
          var content = {
            src: publishedUrl,
            id: contentId
          };
          console.log('URL = ', publishedUrl);
          console.log('title = ', contentId);
          d.notify(content);
        },
        failure: function (obj, errorString) {
          console.log('publish failed.', errorString);
        }
      });
    }

    this.getAllContentList = function () {
      var d = $q.defer();
      getImageBucket().then(function (bucket) {
        var queryCallbacks = {
          success: function (queryPerformed, resultSet, nextQuery) {
            for (var i = 0; i < resultSet.length; i++) {
              notifyContent(resultSet[i], d);
            }
            if (nextQuery !== null) {
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
      })
      ;
      return d.promise;
    }
    ;

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
    };
    this.getAkapenData = function (contentId) {
      var d = $q.defer();
      getAkapenBucket().then(function (bucket) {
        var clause = KiiClause.equals("contentId", contentId);
        var query = KiiQuery.queryWithClause(clause);
        var queryCallbacks = {
          success: function (queryPerformed, resultSet, nextQuery) {
            for (var i = 0; i < resultSet.length; i++) {
              console.log('akapenData get.', resultSet[i]);
              var akapenData = {
                contentId: contentId,
                akapen: resultSet[i].get('akapen'),
                comment: resultSet[i].get('comment')
              };
              d.resolve(akapenData);
            }
            if (nextQuery != null) {
              bucket.executeQuery(nextQuery, queryCallbacks);
            }
          },
          failure: function (queryPerformed, anErrorString) {
          }
        };
        bucket.executeQuery(query, queryCallbacks);
      });
      return d.promise;
    };

    this.getAkapenDataList = function (contentId) {
      var d = $q.defer();
      getAkapenBucket().then(function (bucket) {
        var clause = KiiClause.equals("contentId", contentId);
        var query = KiiQuery.queryWithClause(clause);
        var queryCallbacks = {
          success: function (queryPerformed, resultSet, nextQuery) {
            for (var i = 0; i < resultSet.length; i++) {
              console.log('akapenData get.', resultSet[i], resultSet[i].get('contentId'));
              var akapenData = {
                contentId: contentId,
                akapen: resultSet[i].get('akapen'),
                comment: resultSet[i].get('comment')
              };
              d.notify(akapenData);
            }
            if (nextQuery != null) {
              bucket.executeQuery(nextQuery, queryCallbacks);
            }
          },
          failure: function (queryPerformed, anErrorString) {
          }
        };
        bucket.executeQuery(query, queryCallbacks);
      });
      return d.promise;
    };

  })
;