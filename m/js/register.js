$(function () {

    //获取验证码
    $(".getCode").on("click", function () {
        $.ajax({
            url: "/user/vCode",
            success: function (res) {
                console.log(res.vCode);
            }
        })
    })


    //实现注册功能
    $("#register-btn").on("click", function () {
        //获取表单数据
        var userName = $("#username").val()
        var mobile = $("#mobile").val()
        var passWord = $("#password").val()
        var againPass = $("#againPass").val()
        var vCode = $("#vCode").val()
        //请求ajax
        $.ajax({
            url: "/user/register",
            type: "post",
            //发送请求之前的验证
            beforeSend: function () {
                console.log(userName.trim() == "");
                //用户名非空
                if (userName.trim() == "") {
                    mui.toast("请输入合法用户名");
                    return false
                }
                //手机号合法
                var reg = /^1[3456789]\d{9}$/
                if (!reg.test(mobile)) {
                    mui.toast('请输入合法手机号');
                    return false
                }
                //密码非空并且两次相等
                if (passWord.trim() == " " || passWord != againPass) {
                    mui.toast('两次密码不相同');
                    return false
                }

            },
            data: {
                "username": userName,
                "password": passWord,
                "mobile": mobile,
                "vCode": vCode
            },

            success: function (res) {

                if (res.success) {
                    location.href = "login.html"
                } else {
                    mui.toast(res.message);
                }

            }

        })

    })


})