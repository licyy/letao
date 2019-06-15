$(function () {
    //点击确认按钮发送ajax登陆
    $("#enter").on("click", function () {
        var userName = $("#userName").val()
        var passWord = $("#passWord").val()

        $.ajax({
            url: "/user/login",
            type: "post",
            beforeSend: function () {
                if (userName.trim() == "" || passWord.trim() == "") {
                    mui.toast("请填写用户名和密码")
                    return false
                }
            },
            data: {
                "username": userName,
                "password": passWord
            },
            success: function (res) {
                if (res.success) {
                    location.href = "user.html"
                }else{
                    mui.toast(res.message)
                }
                console.log(res);

            }

        })
    })



})