//页面还没有加载时，就应该将数据先获取到，等页面加载之后再渲染
var html
$.ajax({
    url: "/user/queryUserMessage",
    type: "get",
    async: false,
    success: function (res) {
        if (res.error) {
            mui.toast(res.message)
            setTimeout(function () {
                location.href = "login.html"
            }, 1000)
        } else {
             html = template("userMsg", res)
        }

        console.log(res);

    }

})

$(function () {

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