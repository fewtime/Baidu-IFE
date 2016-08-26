// 2.1
// 判断arr是否为一个数组，返回一个bool值
// http://www.nowamagic.net/librarys/veda/detail/1250
function isArray(arr) {
    return arr instanceof Array && Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn === 'function'
        && Object.prototype.toString.call(fn) === '[object Function]'
        && !!fn
        && !fn.nodeName
        && fn.construct != String
        && fn.construct != RegExp
        && fn.construct != Math
        && /function/i.test(fn + '');
}


// 2.2
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
// https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
function cloneObject(src) {
    var copy;

    // 数字，字符串，布尔，null, undefined
    if (src === null || typeof src != 'object') {
        return src;
    }

    // Date
    if (src instanceof Date) {
        copy = new Date(src.getTime());
        return copy;
    }

    // Array
    if (isArray(src)) {
        copy= [];
        for (var i = 0; i < src.length; ++i) {
            copy[i] = src[i];
        }
        return copy;
    }

    // Object
    // Stackoverflow 中有缺陷
    // 若Object的属性里面有数组，直接赋值只是引用复制
    // 因而使用 =typeof= 判断Object.attr 是否为一个 object 型
    // 根据判断是否递归，从而实现深复制
    if (src instanceof Object) {
        copy = {};
        for (var attr in src) {
            if (src.hasOwnProperty(attr)) {
                if (typeof src[attr] === 'object') {
                    copy[attr] = cloneObject(src[attr]);
                } else {
                    copy[attr] = src[attr];
                }
            }
        }
        return copy;
    }

    throw new Error("Unable to copy src! Its type isn't supported.");
}

// 测试用例：
// var srcObj = {
//     a: 1,
//     b: {
//         b1: ["hello", "hi"],
//         b2: "JavaScript"
//     }
// };
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);

// srcObj.a = 2;
// srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"

// 2.3
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i] !== '' && newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// 使用示例
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]

// 对数组进行去空白元素操作
function delBlankElement(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i].match(/\s+/) || arr[i] === "") {
            continue;
        } else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var len = str.length;
    for (var i = 0; i < len && (str.charAt(i) === ' ' || str.charAt(i) === '\t'); ++i)
        ;
    if (i === len) {
        return '';
    }
    for (var j = len-1; j > 0 && (str.charAt(j) === ' ' || str.charAt(j) === '\t'); --j)
        ;
    return str.substring(i, j+1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
// 使用示例
// var str = '   hi!  ';
// str = simpleTrim(str);
// console.log(str); // 'hi!'
// str = trim(str);
// console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; ++i) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item) {
//     console.log(item);
// }
// each(arr, output);  // java, c, php, html

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index + ': ' + item);
// }
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var cnt = 0;
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            cnt++;
        }
    }
    return cnt;
}

// 使用示例
// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     }
// };
// console.log(getObjectLength(obj)); // 3

// 2.4
// 判断是否为邮箱地址
// https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function isEmail(emailStr) {
    // var re = /^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i;
    // Here's the example of regular expression that accepts unicode:
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var re = /^1[3-8]\d{9}$/;
    return re.test(phone);
}

// 3.1
function hasClass(element, className) {
    return element.className.match(className);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var originClassName = element.className;
    element.className = originClassName === "" ? newClassName : originClassName + ' ' + newClassName;
}
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originClassName = element.className;
    var pattern = new RegExp("\\b" + oldClassName + "\\b");
    element.className = trim(originClassName.replace(pattern, ''));
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    return pos;
}
// function getPosition(element) {
//     // 绝对位置
//     var getElementLeft = function(element) {
//         var actualLeft = element.offsetLeft;
//         var current = element.offsetParent;

//         while (current !== null) {
//             actualLeft += current.offsetLeft;
//             current = current.offsetParent;
//         }

//         return actualLeft;
//     };
//     var getElementTop = function(element) {
//         var actualTop = element.offsetTop;
//         var current = element.offsetParent;

//         while (current !== null) {
//             actualTop += current.offsetTop;
//             current = current.offsetParent;
//         }

//         return actualTop;
//     };

//     // 相对位置
//     var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
//     var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

//     getElementLeft -= scrollLeft;
//     getElementTop -= scrollTop;

//     return {
//         x: getElementLeft,
//         y: getElementTop
//     };
// }

// 实现一个简单的Query
function $(selector) {
    var allChild = [];
    var findChilds = function (element) {    // 递归获取所有子元素
        return element.getElementsByTagName('*');
    };

    var ele = document.getElementsByTagName('html')[0];
    //去除多余的空格并分割
    var sele = selector.replace(/\s+/, ' ').split(' ');

    for (var i = 0, len = sele.length; i < len; ++i) {
        ele = findChilds(ele);
        eleLen = ele.length;

        switch (sele[i][0]) {
            // ID
        case '#':
            for (var k = 0; k < eleLen; ++k) {
                if (ele[k].id === sele[i].substring(1)) {
                    ele = ele[k];
                    break;
                }
            }
            break;
            // Class
        case '.':
            var flag = false;
            for (var k = 0; k < eleLen; ++k) {
                var eleClassNameArr = ele[k].className.split(' ');
                for (var j = 0; j < eleClassNameArr.length; ++j) {
                    if (eleClassNameArr[j] === sele[i].substring(1)) {
                        ele = ele[k];
                        flag = true;
                        break;
                    }
                }
                if (flag === true) {
                    break;
                }
            }
            break;
            // Attribute
        case '[':
            var eqIndex = sele[i].indexOf('=');
            if (eqIndex != -1) {
                var key = sele[i].substring(1, eqIndex);
                var value = sele[i].substring(eqIndex+1, sele[i].length-1);
                for (var k = 0; k < eleLen; ++k) {
                    if (ele[k][key] === sele[i]) {
                        ele = ele[k];
                        break;
                    }
                }
            } else {
                var key = sele[i].substring(1, sele[i].length-1);
                for (var k = 0; k < eleLen; ++k) {
                    if (ele[k][key]) {
                        ele = ele[k];
                        break;
                    }
                }
            }
            break;
        default:
            for (var k = 0; k < eleLen; ++k) {
                if (ele[k].tagName.toUpperCase() === sele[i].toUpperCase()) {
                    ele = ele[k];
                    break;
                }
            }
            break;
        }
    }

    if (ele === findChilds(document.getElementsByTagName('html')[0])) {
        ele = null;
    }

    return ele;
}

// // 可以通过id获取DOM对象，通过#标示，例如
// $("#adom"); // 返回id为adom的DOM对象

// // 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象

// // 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象

// // 可以通过attribute匹配获取DOM对象，例如
// $("[data-log]"); // 返回第一个包含属性data-log的对象

// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// // 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

// 4.1
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener);
    } else if (element.attachEvent) {
        element.attachEvent("on"+event, listener);
    }
}

// addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEnventListener(event, listener);
    } else if (element.detachEvent) {
        element.detachEvent("on"+event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addKeyDownEvent(13, element, listener);
}

// 实现对于按任意键时的事件绑定
function addKeyEvent(element, eventName, listener) {
    addEvent(element, eventName, listener);
}

function addKeyDownEvent(element, listener) {
    addKeyEvent(element, "keydown", listener);
}

function addKeyUpEvent(element, listener) {
    addKeyEvent(element, "keyup", listener);
}

function addKeyPressEvent(element, listener) {
    addKeyEvent(element, "keypress", listener);
}

// 4.2
function clickListener(event) {
    console.log(event);
}

// $.click($("#item1"), clickListener);
// $.click($("#item2"), clickListener);
// $.click($("#item3"), clickListener);

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(event) {
        var target = event.target || event.srcElement;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener.call(target, event);
        }
    });
}

$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
};

$.click = function (selector, listener) {
    addClickEvent($(selector), listener);
};

$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listenter);
};

$.delegate = function(selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener);
};

$.keydown = function(selector, listener) {
    addKeyDownEvent($(selector), listener);
};

$.keyup = function(selector, listener) {
    addKeyUpEvent($(selector), listener);
};

$.keypress = function(selector, listener) {
    addKeyPressEvent($(selector), listener);
};

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
// $.delegate($("#list"), "li", "click", clickHandle);

// Test
// $.click($("[data-log]"), clickListener);
// $.delegate($('#list'), "li", "click", clickListener);

// 5
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    //ie10的信息：
    //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
    //ie11的信息：
    //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
    var info = window.navigator.userAgent.toLowerCase();
    var ie = info.match(/rv:([\d+])/) || info.match(/msie ([\d+])/);
    if (ie) {
        return ie[1];
    } else {
        return -1;
    }
}
// Test
// console.log(isIE());

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var d = new Date();
    d.setTime(d.getTime() + expiredays * 60 * 60 * 24);
    var expires = "expires=" + d.toUTCString();
    return cookieName + "=" + cookieValue + ";" + expires;
}

// 获取cookie值
function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    console.log(ca);
    for (var i = 0; i < ca.length; ++i) {
        var c = ca[i].replace(/\s*/, "");
        console.log(c);
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// 6
function ajax(url, options) {
    var dataResult;

    // 处理data
    if (typeof(options.data) === 'object') {
        var str = "";
        for (var c in options.data) {
            str = str + c + '=' + options.data[c] + '&';
        }
        dataResult = str.substring(0, str.length-1);
    }

    // 处理type
    options.type = options.type || "GET";

    // 创建XMLhttpRequest()
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.Imhotep");

    // 发送数据
    xhr.open(options.type, url, true);
    if (options.type === "GET") {
        xhr.send(null);
    } else {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(dataResult);
    }

    // 状态检查
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                if (options.onsuccess) {
                    options.onsuccess(xhr.responseText, xhr.responseXML);
                }
            } else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    };
}

// 使用示例：
// ajax(
//     'http://localhost:8080/server/ajaxtest',
//     {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText, xhr) {
//             console.log(responseText);
//         },
//         onfail: function() {
//             console.log("failed");
//         }
//     }
// );
