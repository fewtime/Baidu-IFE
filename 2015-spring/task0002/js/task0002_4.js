var suggestData = ['a', 'abandon', 'abdomen', 'abide', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abound', 'about', 'above', 'fiction', 'field', 'fierce', 'fight', 'test2', 'test3'];

var inputDiv = $("input");
var ulDiv = $("ul");

window.onload = function() {
    mouseListenerForLi();
    keyListenerForLi();
};

$.keyup("input", function(element) {
    var inputStr = inputDiv.value;
    var pattern = new RegExp("^"+inputStr, "i");
    var liHTML = "";

    // Ignore Enter, Down, Up
    if (element.keyCode === 13 || element.keyCode === 40 || element.keyCode === 38) {
        return ;
    }

    if (inputStr === "") {
        ulDiv.style.display = "none";
    } else {
        for (var i = 0; i < suggestData.length; ++i) {
            if (suggestData[i].match(pattern)) {
                liHTML += "<li><span>" + inputStr + "</span>" + suggestData[i].substring(inputStr.length) + "</li>";
            }
        }
        ulDiv.innerHTML = liHTML;
        ulDiv.style.display = "block";
    }
});

function mouseListenerForLi() {
    $.delegate("ul", "li", "mouseover", function() {
        addClass(this, "active");
    });
    $.delegate("ul", "li", "mouseout", function() {
        removeClass(this, "active");
    });
    $.delegate("ul", "li", "click", function() {
        inputDiv.value = deleteSpan(this.innerHTML);
        ulDiv.style.display = "none";
    });
}

function keyListenerForLi() {
    $.keyup("input", function(event) {
        var activeLi = $(".active");
        console.log($(".active"));
        console.log($("li"));
        // Down
        if (event.keyCode == 40) {
            if (activeLi) {
                var nextLi = activeLi.nextSibling;
                if (nextLi) {
                    removeClass(activeLi, "active");
                    addClass(nextLi, "active");
                }
            } else {
                addClass($("li"), "active");
            }
        }
        // Up
        if (event.keyCode == 38) {
            if (activeLi) {
                var prevLi = activeLi.previousSibling;
                if (prevLi) {
                    removeClass(activeLi, "active");
                    addClass(prevLi, "active");
                }
            } else {
                // addClass($("ul").lastChild, "active");
                addClass($("li"), "active");
            }
        }

        // Enter
        if (event.keyCode == 13) {
            if (activeLi) {
                inputDiv.value = deleteSpan(activeLi.innerHTML);
                ulDiv.style.display = "none";
            }
        }
    });
}

function deleteSpan(str) {
    var pattern = /^<span>(\w*)<\/span>(\w*)$/;
    var strArr = str.match(pattern);
    return strArr[1] + strArr[2];
}
