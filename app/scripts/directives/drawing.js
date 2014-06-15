'use strict';

angular.module('akaPenSenseiApp')
  .directive('drawing', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var ctx = element[0].getContext('2d');
        // variable that decides if something should be drawn on mousemove
        var drawing = false;
        // the last coordinates before the current move
        var lastX;
        var lastY;
        element.bind('mousedown', function (event) {
          if (event.offsetX != undefined) {
            lastX = event.offsetX;
            lastY = event.offsetY;
          } else {
            lastX = event.originalEvent.layerX;
            lastY = event.originalEvent.layerY;
          }
          // begins new line
          ctx.beginPath();
          drawing = true;
        });
        var currentX;
        var currentY;
        element.bind('mousemove', function (event) {
          if (drawing) {
            // get current mouse position
            if (event.offsetX != undefined) {
              currentX = event.offsetX;
              currentY = event.offsetY;
            } else {
              currentX = event.originalEvent.layerX;
              currentY = event.originalEvent.layerY;
            }

            draw(lastX, lastY, currentX, currentY);

            // set current coordinates to last one
            lastX = currentX;
            lastY = currentY;
          }
        });
        element.bind('mouseup', function () {
          // stop drawing
          drawing = false;
        });
        // canvas reset
        function reset() {
          element[0].width = element[0].width;
        }

        scope.reset = reset;

        // canvasの保存
        function getDataURL() {
          return element[0].toDataURL('image/png');
        }

        scope.getDataURL = getDataURL;

        function draw(lX, lY, cX, cY) {
          // line from
          ctx.moveTo(lX, lY);
          // to
          ctx.lineTo(cX, cY);
          // color
          ctx.strokeStyle = 'red';
          // draw it
          ctx.stroke();
        }
      }
    };
  });
