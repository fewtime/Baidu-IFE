function addEvent(element, event, listener) {
  if (element.addEventListener) {
    element.addEventListener(event, listener);
  } else if (element.attachEvent) {
    element.attachEvent("on"+event, listener);
  } else {
    element["on"+event] = listener;
  }
}

function each(arr, fn) {
  for (var i = 0; i < arr.length; ++i) {
    fn(arr[i]);
  }
}

window.onload = function() {
  var numInputDiv = document.getElementById("num-input");
  var buttonList = document.getElementsByTagName("button");
  var containerDiv = document.getElementById("container");

  var queue = {
    list: [],
    isEmpty: function() {
      return this.list.length === 0;
    },
    leftPush: function(str) {
      this.list.unshift(str);
      this.print();
    },
    rightPush: function(str) {
      this.list.push(str);
      this.print();
    },
    leftPop: function() {
      if (!this.isEmpty()) {
        alert(this.list.shift());
        this.print();
      } else {
        alert("The queue is already empty");
      }
    },
    rightPop: function() {
      if (!this.isEmpty()) {
        alert(this.list.pop());
        this.print();
      } else {
        alert("The queue is already empty");
      }
    },
    print: function() {
      var containerStr = "";
      each(this.list, function(item) {
        containerStr += "<div>" + item + "</div>";
      });
      containerDiv.innerHTML = containerStr;
      addDivDelClickEvent();
    },
    eraser: function(index) {
      console.log("eraser:" + index);
      this.list.splice(index, 1);
      this.print();
    }
  };

  // 为container中的每个div绑定删除函数
  function addDivDelClickEvent() {
    for (var i = 0; i < containerDiv.childNodes.length; ++i) {
      // 这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length); 
      // https://github.com/hellozts4120/IFE-2016/tree/master/task2/serial2/Project18
      addEvent(containerDiv.childNodes[i], "click", (function(i) {
        console.log(queue.list);
        console.log("out: " + i);
        return function() {
          return queue.eraser(i);
        }})(i));
    }
  }

  addEvent(buttonList[0], "click", function() {
    var input = numInputDiv.value;
    if (input.match(/^[0-9]+$/)) {
      queue.leftPush(input);
    } else {
      alert("Please enter an interger");
    }
  });
  addEvent(buttonList[1], "click", function() {
    var input = numInputDiv.value;
    if (input.match(/^[0-9]+$/)) {
      queue.rightPush(input);
    } else {
      alert("Please enter an interger");
    }
  });
  addEvent(buttonList[2], "click", function() {
    queue.leftPop();
  });
  addEvent(buttonList[3], "click", function() {
    queue.rightPop();
  });
}