/*
#############################################################################################
# File:         app.js
# Description:  Exposes components to the app
# Created by:   Ron Robertson
# Copyright:    Copyright 2017 Ron Robertson all rights reserved.
#############################################################################################
*/

angular.module('sims-mobile-data-portal', ['app.routes', 'mainCtrl', 'adminCtrl', 'memberCtrl', 'projectService', 'memberService']);


angular.module('sims-mobile-data-portal').directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);

angular.module('sims-mobile-data-portal').directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});
     