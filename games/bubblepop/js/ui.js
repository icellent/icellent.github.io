/**
 * Created by icellent on 15/12/29.
 */
var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.ui = (function ($) {
    var ui = {
        BUBBLE_DIM: 50,
        ROW_HEIGHT: 38,
        init: function () {
        },
        hideDialog: function () {
            $('.dialog').fadeOut(300);
        },
        getMouseCoords: function (e) {
            return coords = {x: e.pageX, y: e.pageY};
        },
        getBubbleCoords: function (bubble) {
            var bubbleCoords = bubble.position();
            bubbleCoords.left += ui.BUBBLE_DIM / 2;
            bubbleCoords.top += ui.BUBBLE_DIM / 2;
            return bubbleCoords;
        },
        getBubbleAngle: function (bubble, e) {
            var mouseCoords = ui.getMouseCoords(e);
            var bubbleCoords = ui.getBubbleCoords(bubble);
            var gameCoords = $("#game").position();
            var boardLeft = 120;
            var angle = Math.atan((mouseCoords.x - bubbleCoords.left - boardLeft)
                / (bubbleCoords.top + gameCoords.top - mouseCoords.y));
            if (mouseCoords.y > bubbleCoords.top + gameCoords.top) {
                angle += Math.PI;
            }
            return angle;
        },
        fireBubble: function (bubble, coords, duration) {
            var complete = function () {
                if (bubble.getRow() !== null) {
                    bubble.getSprite().css(Modernizr.prefixed("transition", ""));
                    bubble.getSprite().css({
                        left: bubble.getCoords().left - ui.BUBBLE_DIM / 2,
                        top: bubble.getCoords().top - ui.BUBBLE_DIM / 2
                    });
                }
            };
            if (Modernizr.csstransitions) {
                bubble.getSprite().css(Modernizr.prefixed("transition"), "all " +
                    (duration / 1000) + "s linear");
                bubble.getSprite().css({
                    left: coords.x - ui.BUBBLE_DIM / 2,
                    top: coords.y - ui.BUBBLE_DIM / 2
                });
                setTimeout(complete, duration);
            } else {
                bubble.getSprite().animate({
                        left: coords.x - ui.BUBBLE_DIM / 2,
                        top: coords.y - ui.BUBBLE_DIM / 2
                    },
                    {
                        duration: duration,
                        easing: "linear",
                        complete: complete
                    });
            }
        },
        drawBoard: function (board) {
            var rows = board.getRows();
            var gameArea = $("#board");
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                for (var j = 0; j < row.length; j++) {
                    var bubble = row[j];
                    if (bubble) {
                        var sprite = bubble.getSprite();
                        gameArea.append(sprite);
                        var left = j * ui.BUBBLE_DIM / 2,
                            top = i * ui.ROW_HEIGHT;
                        sprite.css({
                            left: left,
                            top: top
                        })
                    }
                }
            }
        },
        drawBubblesRemaining: function (numBubbles) {
            $("#bubbles_remaining").text(numBubbles);
        }
    };
    return ui;
})(jQuery);
