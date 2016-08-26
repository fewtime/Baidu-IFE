$.click("button", function() {
    var content = $("textarea").value;
    // console.log($("textarea"));
    // console.log(content);

    // 文本处理
    content = trim(content); // 去掉首位的空格
    var contentArr = content.split(/\n|\s+|,|，|;|；|、/);
    contentArr = delBlankElement(uniqArray(contentArr)); // 去重，去空白
    console.log(contentArr);

    var showDiv = $(".show");
    var warnDiv = $(".warn");

    if (contentArr.length > 10 || contentArr.length === 0) {
        showDiv.style.display = "none";
        warnDiv.style.display = "block";
    } else {
        warnDiv.style.display = "none";
        var checkboxHTML = "";
        for (var i = 0; i < contentArr.length; ++i) {
            checkboxHTML += "<br/><input type=\"checkbox\"><label>" + contentArr[i] + "</label>";
        }
        checkboxHTML = checkboxHTML.substring("<br/>".length); // 去除首个换行
        console.log(checkboxHTML);
        showDiv.innerHTML = checkboxHTML;
        showDiv.style.display = "block";
    }
});
