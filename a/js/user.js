$(function () {
    //发送请求获取用户数据，将数据渲染到界面上
    getData()

    function getData() {
        $.ajax({
            url: "/user/queryUser",
            type: "get",
            data: {
                page: 1,
                pageSize: 5

            },
            success: function (res) {
                console.log(res);
                var html = template("userTpl", res)
                // console.log(html);
                $("#user-box").html(html)
            }

        })
    }



    //点击编辑按钮改变操作和状态文本
    $("#user-box").on("click", ".edit-btn", function () {
        var id = $(this).attr("data-id")
        var isDelete = $(this).attr("data-isDelete")
        isDelete = isDelete==1 ? 0 : 1
        $.ajax({
            url: "/user/updateUser",
            type: "post",
            data: {
                id,
                isDelete
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    getData()
                }

            }
        })

    })
})