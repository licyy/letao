//页面还没有加载时，就应该将数据先获取到，等页面加载之后再渲染
var msg
$.ajax({
    url: "/user/queryUserMessage",
    type: "get",
    async: false,
    success: function (res) {
        msg = res
        // if (res.error) {
        //     mui.toast(res.message)
        //     setTimeout(function () {
        //         location.href = "login.html"
        //     }, 1000)
        // } else {
        //     html = template("userMsg", res)
        // }

        // console.log(res);

    }

})

$(function () {
    //页面加载完成之后再使用模板拼接渲染
    if (msg.error) {
        mui.toast(msg.message)
        setTimeout(function () {
            location.href = "login.html"
        }, 1000)
    } else {
        var html = template("userMsg", msg)
    }

    $("#userMsg-box").append(html)
    //点击退出登陆
    $("#logout").on("click", function () {
        $.ajax({
            url: "/user/logout",
            type: "get",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    location.href = "login.html"
                }

            }
        })
    })
})