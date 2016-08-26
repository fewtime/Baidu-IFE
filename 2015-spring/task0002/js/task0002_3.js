var imgList = $(".image-box");
var timer = null;
var timerForImgMoving = null;
var currentID = 1;
var nextID = 0;
var imageWidth = $("img").offsetWidth;
var iconArr = $(".icon-box").getElementsByTagName("a");
var intervalTimer = 3000;
var intervalTimerForImgMoving = 30;

for (var i = 0; i < iconArr.length; ++i) {
    iconArr[i].index = i + 1;
}

$.delegate(".icon-box", "a", "click", function() {
    clearInterval(timer);
    var clickIndex = this.index;
    rotate(clickIndex);
    timer = setInterval(rotate, intervalTimer);
});

function rotate(clickIndex) {
    if (clickIndex) {
        nextID = clickIndex;
    } else {
        nextID = currentID < iconArr.length ? currentID+1 : 1;
    }

    removeClass(iconArr[currentID - 1], "active");
    addClass(iconArr[nextID - 1], "active");

    move("-" + (nextID - 1) * imageWidth);

    currentID = nextID;
}

function move(position) {
    clearInterval(timerForImgMoving);

    timerForImgMoving = setInterval(function() {
        var speed = (position - imgList.offsetLeft) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        imgList.style.left = imgList.offsetLeft + speed + "px";
    }, intervalTimerForImgMoving);
}

timer = setInterval(rotate, intervalTimer);
