var rangeMin = 10;
var rangeMax = 100;
var randomMinLength = 50;
var randomMaxLength = 100;
var numInputDiv = document.getElementById("num-input");
var buttonList = document.getElementsByTagName("button");
var containerDiv = document.getElementById("container");

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

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function bubbleSort(queue) {
  var arr = queue.list;
  var i, j = 0, temp,
  delay = 50, timer;

  i = arr.length - 1;

  timer = setInterval(function() {
    if (i < 1) {
      clearInterval(timer);
    }
    if (j == i) {
      --i;
      j = 0;
    }
    if (arr[j] > arr[j + 1]) {
      swap(arr, j, j + 1);
      queue.print();
    }
    ++j;
  }, delay);
};

function selectionSort(queue) {
  var arr = queue.list;
  var i = 0, j = 1, min = 0, len = arr.length,
   delay = 50, timer;

   timer = setInterval(function() {
    if (i == len - 1) {
      clearInterval(timer);
    }

    if (j == len) {
      swap(arr, i, min);
      queue.print();
      ++i;
      min = i;
      j = i + 1;
    }

    if (arr[j] < arr[min]) {
      min = j;
    }

    ++j;

   }, delay);
};

function insertionSort(queue) {
  var arr = queue.list;
  var len = arr.length, i = 1, j = i - 1, temp,
    delay = 100, timer,
    outer = true, inner = false;

  timer = setInterval(function() {
    if (outer) {
      if (i == len) {
        clearInterval(timer);
      }
      if (arr[i] < arr[i - 1]) {
        temp = arr[i];
        j = i - 1;
        outer = false;
        inner = true;
      } else {
        ++i;
      }
    }

    if (inner) {
      if (j < 0 || arr[j] < temp) {
        arr[j + 1] = temp;
        queue.print();
        ++i;
        inner = false;
        outer = true;
      } else {
        arr[j + 1] = arr[j];
        queue.print();
        --j;
      }
    }
  }, delay);

};

var queue = {
  list: [],
  init: function() {
    this.random();
  },
  random: function() {
    this.list.splice(0, this.list.length);
    var randomListLength = Math.floor(
        Math.random() * (randomMaxLength - randomMaxLength) + randomMinLength); // [10, 30)
    for (var i = 0; i < randomListLength; ++i) {
      var randomNum = Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
      randomNum % 3 === 0 ? this.leftPush(randomNum) : this.rightPush(randomNum);
    }
  },
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
      containerStr += "<div style=\"height: " + item * 3 + "px; \"></div>";
    });
    containerDiv.innerHTML = containerStr;
    addDivDelClickEvent();
  },
  eraser: function(index) {
    // console.log("eraser:" + index);
    this.list.splice(index, 1);
    this.print();
  },
};

  // 为container中的每个div绑定删除函数
function addDivDelClickEvent() {
  for (var i = 0; i < containerDiv.childNodes.length; ++i) {
    // 这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length); 
    // https://github.com/hellozts4120/IFE-2016/tree/master/task2/serial2/Project18
    addEvent(containerDiv.childNodes[i], "click", (function(i) {
      // console.log(queue.list);
      // console.log("out: " + i);
      return function() {
        return queue.eraser(i);
      }})(i));
  }
}

window.onload = function() {

  addEvent(buttonList[0], "click", function() {
    var input = numInputDiv.value;
    if (input.match(/^[0-9]+$/)) {
      var num = Number(input);
      if (num >= rangeMin && num <= rangeMax) {
        queue.leftPush(num);
      } else {
        alert("Range: 10-100");
      }
    } else {
      alert("Please enter an interger");
    }
  });
  addEvent(buttonList[1], "click", function() {
    var input = numInputDiv.value;
    if (input.match(/^[0-9]+$/)) {
      var num = Number(input);
      if (num >= rangeMin && num <= rangeMax) {
        queue.rightPush(input);
      } else {
        alert("Range: 10-100");
      }
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
  addEvent(buttonList[4], "click", function() {
    queue.random();
  });
  addEvent(buttonList[5], "click", function() {
    bubbleSort(queue);
  });
  addEvent(buttonList[6], "click", function() {
    selectionSort(queue);
  });
  addEvent(buttonList[7], "click", function() {
    insertionSort(queue);
  });
  queue.init();
}