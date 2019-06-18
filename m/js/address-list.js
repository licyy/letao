$(function () {
    //设置一个变量来接收ajax获取到的数据，便于编辑时获取当前数据
    var addrArr = null

    //获取邮编数据，渲染到界面上
    $.ajax({
        url: "/address/queryAddress",
        type: "get",
        success: function (res) {
            // console.log(res);
            addrArr = res
            var html = template("addressList", {
                res
            })
            // console.log(html);
            $("#addressBox").html(html)
        }
    })

    //点击删除按钮，删除数据
    $("#addressBox").on("click", "#remove", function () {
        var li = $(this).parents("li")[0]
        var id = $(this).parent().attr("data-id")
        console.log(id);
        console.log($(this).parent());
        console.log($(this).parents("li"));
        mui.confirm("是否删除该地址", function (bool) {
            if (bool.index == 1) {
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data: {
                        id
                    },
                    success: function (res) {
                        if (res.success) {
                            //remove()方法原生和zepot都可以
                            li.remove()
                        }
                    }
                })

            } else {

                mui.swipeoutClose(li)
            }

        })

    })

    //点击编辑按钮，编辑数据
    //这里没有负责编辑的后台接口，需要在本地获取要修改的数据，将数据记录在localStorage里面
    $("#addressBox").on("click", "#edit", function () {
        var li = $(this).parents("li")[0]
        //先获取点击的data-id
        var id = $(this).parent().attr("data-id")
        // 通过id获取这条数据,遍历最开始获取到的res中的数据，res[i].id=data-id的就是当前需要编辑
        for (var i = 0; i < addrArr.length; i++) {
            if (addrArr[i].id == id) {
                //localStorage保存的只能是字符串，使用JSON.stringify()转换成字符串
                var addrStr = JSON.stringify(addrArr[i])
                localStorage.setItem("currentAddr", addrStr)
            }
        }
        mui.confirm("是否进行编辑", function (bool) {
            if(bool.index==1){
                location.href="editAddress.html"
            }else{
                mui.swipeoutClose(li)
            }
        })


    })

    $("#cancel").on("click", function () {

        mui.toast("返回个人中心")
        setTimeout(function () {
            location.assign("user.html")
        }, 1000)

    })

})