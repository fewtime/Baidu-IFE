var maxLimit = 10;

var $ = function(str) {
  return document.querySelector(str);
};

function addEvent(element, event, listener) {
  if (element.addEventListener) {
    element.addEventListener(event, listener);
  } else if (element.attachEvent) {
    element.attachEvent("on" + event, listener);
  } else {
    element["on" + event] = listener;
  }
}

function delBlankElement(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i].match(/\s+/) ||
      arr[i] === "" ||
      arr[i] === null) {
      continue;
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function CreateList(parentsDiv) {
  this.queue = [];
  this.render = function() {
    var str = "";
    this.queue.forEach(function(ele) {
      str += "<span>" + ele + "</span>";
    });
    parentsDiv.innerHTML = str;
  };
}

CreateList.prototype.push = function(str) {
  if (this.queue.indexOf(str) === -1) {
    this.queue.push(str);
    this.render();
  }
};

CreateList.prototype.shift = function() {
  this.queue.shift();
  this.render();
};

CreateList.prototype.isFull = function() {
  if (this.queue.length === maxLimit) {
    return true;
  } else {
    return false;
  }
};

CreateList.prototype.remove = function(ele) {
  this.queue.splice(this.queue.indexOf(ele), 1);
};

var tagList = new CreateList($("#tag-container"));
var hobbyList = new CreateList($("#hobby-container"));

window.onload = function() {
  addEvent($("#tag-text"), "keyup", function(e) {
    if (e.keyCode === 13 ||
      /[,，;；、\s\n]+/.test($("#tag-text").value)) {
      show($("#tag-text").value, tagList);
      $("#tag-text").value = "";
    }
  });
  addEvent($("#hobby-confirm"), "click", function() {
    show($("#hobby-text").value, hobbyList);
  });

  addEvent($("#tag-container"), "mouseover", function(e) {
    if (e.target && e.target.nodeName === "SPAN") {
      e.target.firstChild.insertData(0, "点击删除：");
    }
  });

  addEvent($("#tag-container"), "mouseout", function(e) {
    if (e.target && e.target.nodeName === "SPAN") {
      e.target.firstChild.deleteData(0, "点击删除：".length);
    }
  });

  addEvent($("#tag-container"), "click", function(e) {
    if (e.target && e.target.nodeName === "SPAN") {
      var removedEle = e.target.innerHTML.split("点击删除：")[1];
      tagList.remove(removeEle);
      $("#tag-container").removeChild(e.target);
    }
  });
};

function show(str, list) {
  var data = delBlankElement(
    str.trim().split(/[^A-Za-z0-9\u4e00-\u9fa5]/));
  data.forEach(function(ele) {
    if (list.isFull()) {
      list.shift();
    }
    list.push(ele);
  });
}
