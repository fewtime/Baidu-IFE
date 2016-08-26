var clock;

$.click("button", function() {
    clearInterval(clock);

    var showDir = $(".show");

    // 文本处理
    var futureTimeStr = $("input").value;
    var pattern = /^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|(3[0-1]))$/;


    if (futureTimeStr.match(pattern)) {
        var futureTime = new Date(futureTimeStr.replace('-', '/'));
        var futureTimeArr = futureTimeStr.split('-');
        clock = setInterval(count, 900);
        function count() {
            var currentTime = new Date();
            var timeDifference = futureTime.getTime() - currentTime.getTime();
            if (timeDifference < 0) {
                showDir.innerHTML = "请输入未来的某一天";
                clearInterval(clock);
                return ;
            } else if (timeDifference === 0) {
                showDir.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有0天0小时0分0秒";
                clearInterval(clock);
                return ;
            } else {
                var day = Math.floor(timeDifference / 1000 / 3600 / 24);
                var hour = Math.floor(timeDifference % (1000 * 3600 * 24) / (3600 * 1000));
                var minute = Math.floor(timeDifference % (1000 * 3600 * 24) % (3600 * 1000) / (60 * 1000));
                var second = Math.floor(timeDifference % (1000 * 3600 * 24) % (3600 * 1000) % (60 * 1000) / 1000);
                showDir.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有" + day + "天" + hour + "小时" + minute + "分" + second + "秒";
            }
        }
    } else {
        showDir.innerHTML = "请输入正确格式";
    }
});
