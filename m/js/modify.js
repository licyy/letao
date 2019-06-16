//页面加载完成后点击确定按钮验证用户输入数据
//点击取消按钮，回到用户信息界面

$(function () {

    // 点击确定按钮
    $("#enter").on("click", function () {
        //获取表单数据
        var originPwd = $("#originPwd").val()
        var newPwd = $("#newPwd").val()
        var againPwd = $("#againPwd").val()
        var vCode = $("#vCode").val()

        $.ajax({
            url: "/user/updatePassword",
            type: "post",
            data: {
                "oldPassword": originPwd,
                "newPassword": newPwd,
                "vCode": vCode,
            },
            beforeSend: function () {
                if (vCode.trim() == "") {
                    mui.toast("验证码错误");
                    return false
                }
                if (newPwd.trim() == "" || newPwd != againPwd) {
                    mui.toast("密码不正确");
                    return false
                }
            },
            success: function (res) {
                if (res.success) {
                    mui.toast("修改成功");
                    setTimeout(function () {
                        location.assign("login.html")
                    }, 1000)

                } else {
                    mui.toast(res.message);
                    $("#originPwd").val("")
                    $("#newPwd").val("")
                    $("#againPwd").val("")
                    $("#vCode").val("")
                }
            }
        })


    })




    //点击获取验证获取验证码
    $("#getCode").on("click", function () {
        $.ajax({
            url: "/user/vCodeForUpdatePassword",
            type: "get",
            success: function (res) {
                if (res.error) {
                    mui.toast(res.message);
                    return false
                }
                console.log(res.vCode);
            }
        })
    })

    //点击取消按钮，回到用户信息界面
    $("#cancel").on("click", function () {
        setTimeout(function () {
            location.href = "user.html"
        }, 1000)
    })
})