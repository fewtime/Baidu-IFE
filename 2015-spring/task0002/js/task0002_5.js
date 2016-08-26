var leftBlock = $(".left-block");
var rightBlock = $(".right-block");

var z = 1;

window.onload = function() {
    init();
};

function init() {
    initPosition(leftBlock);
    initPosition(rightBlock);

    initColor(leftBlock);
    initColor(rightBlock);

    $.delegate(".left-block", "div", "mousedown", drag);
    $.delegate(".right-block", "div", "mousedown", drag);
}

function initPosition(block) {
    for (var i = 0; i < block.children.length; ++i) {
        block.children[i].style.top = 60 * i + 1 + "px";
    }
}

function getRandomColor() {
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
}

function initColor(block) {
    for (var i = 0; i < block.children.length; ++i) {
        block.children[i].style.backgroundColor = getRandomColor();
    }
}

function drag(e) {
    var ev = e || window.event;
    var target = ev.target || ev.srcElement;
    if (target.className.toLowerCase() != "move") {
        return ;
    }

    var rightBlockX = rightBlock.offsetLeft;

    // mouse's position
    var disX = ev.clientX;
    var disY = ev.clientY;

    // current box's position
    var boxLeft = target.offsetLeft;
    var boxTop = target.offsetTop;

    target.style.border = "1px solid #000";
    target.style.opacity = 0.5;

    // zIndex + 1
    target.style.zindex = z++;

    var parent = target.parentNode;
    var firstMove = true;

    // onmousemove
    document.onmousemove = function(e) {
        if (firstMove) {
            parent.removeChild(target);
            $(".drag-block").appendChild(target);
        }
        firstMove = false;
        var ev = e || window.event;

        if (isOutOfScreen(event)) {
            target.parentNode.removeChild(target);
            parent.appendChild(target);
            if (parent.className.search("left-block") != -1) {
                target.style.left = 1 + "px";
            } else if (parent.className.search("right-block") != -1) {
                target.style.left = rightBlockX + 1 + "px";
            }
            initPosition(parent);
            document.onmousemove = null;
        } else {
            target.style.left = boxLeft + event.clientX - disX + "px";
            target.style.top = boxTop + event.clientY - disY + "px";
            initPosition(parent);
        }
    };

    // onmouseup
    document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        target.style.border = "none";
        target.style.borderBottom = "1px solid #000";
        target.style.opacity = 1;

        var ev = e || window.event;
        target.parentNode.removeChild(target);
        if (isInBlock(ev.x, ev.y, leftBlock)) {
            leftBlock.appendChild(target);
            target.style.left = 1 + "px";
            initPosition(leftBlock);
        } else if (isInBlock(ev.x, ev.y, rightBlock)) {
            rightBlock.appendChild(target);
            target.style.left = rightBlockX + 1 + "px";
            initPosition(rightBlock);
        } else {
            parent.appendChild(target);
            if (parent.className.search("left-block") != -1) {
                target.style.left = 1 + "px";
            } else if (parent.className.search("right-block") != -1) {
                target.style.left = rightBlockX + 1 + "px";
            }
            initPosition(parent);
        }
    };
    return false;
}

function isOutOfScreen(event) {
    var maxWidth = document.documentElement.clientWidth;
    var maxHeight = document.documentElement.clientHeight;

    return event.clientX <= 0 ||
        event.clientX >= maxWidth ||
        event.clientY <= 0 ||
        event.clientY >= maxHeight;
}

function isInBlock(x, y, block) {
    var blockMinX = getPosition(block).x;
    var blockMaxX = getPosition(block).x + block.offsetWidth;
    var blockMinY = getPosition(block).y;
    var blockMaxY = getPosition(block).y + block.offsetHeight;

    return x > blockMinX &&
        x < blockMaxX &&
        y > blockMinY &&
        y < blockMaxY;
}
