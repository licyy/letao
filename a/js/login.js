$.ajax({
    url: "/employee/checkRootLogin",
    type: "get",
    //用户未登陆不应该加载下面的内容，所以这次请求是同步的
    async: false,
    success: function (res) {
        if (res.success) {

            location.assign("user.html")

        }
    }
})



$(function () {
    //input type:submit表单有提交和回车功能，我们需要回车功能不需要提交功能
    //return false || e.preventDefault 阻止浏览器默认行为
    $(".login-form").on("submit", function (e) {
        e.preventDefault()
        var username = $("#username").val()
        var password = $("#password").val()
        $.ajax({
            url: "/employee/employeeLogin",
            type: "post",
            data: {
                username,
                password,
            },
            beforeSend: function () {
                if (username.trim() == "") {
                    alert("请输入用户名")
                    return false
                }
                if (password.trim() == "") {
                    alert("请输入密码")
                    return false
                }
            },
            success: function (res) {
                console.log(res);

                if (res.success) {
                    alert("登陆成功")
                    setTimeout(function () {
                        location.assign("user.html")
                    }, 1000)
                } else {
                    alert(res.message)
                    return
                }
            }
        })
        // return false
    })
})