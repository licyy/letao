$(function () {


    mui(document.body).on('tap', '.bindchk', function (e) {
        //触发一次即失效
        mui('.bindchk').button('loading');
        mui(".bindchk").off("tap")
        $('.bindchk').removeClass('mui-btn-warning');
        isChecked();
    });

    // console.log(location.href);
    // console.log(location.search);//?id=1
    //先将id获取出来,将location.search按“=”分割成两个数组
    var id = location.search.split("=")[1]
    var size
    console.log(id);
    //根据id获取相对应的数据
    $.ajax({
        url: "/product/queryProductDetail",
        type: "get",
        data: {
            id
        },
        success: function (res) {
            var html = template("productDetail", res)
            $(".mui-content").html(html)
            var gallery = mui('.mui-slider');
            gallery.slider();
            mui($(".mui-numbox")).numbox()
            mui($(".mui-numbox")).numbox().setOption('max', res.num)
        }
    })
    $(".mui-content").on("click", ".size", function () {
        $(this).addClass("active").siblings().removeClass("active")
        size = $(this).html()

    })
    //绑定点击添加购物车事件
    //判断是否选中了尺寸
    $(".mui-content").on("click", ".addShopcar", function () {
        var productId = id
        var num = mui($(".mui-numbox")).numbox().getValue()

        console.log(size);

        $.ajax({
            url: "/cart/addCart",
            type: "post",
            data: {
                productId,
                num,
                size
            },
            beforeSend: function () {
                if (num == 0) {
                    mui.toast("请选择数量")
                    return false
                }
                if (!size) {
                    mui.toast("请选择尺码")
                    return false
                }

            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    mui.confirm("添加购物车成功，是否查看购物车?", function (msg) {
                        if (msg.index == 1) {
                            location.href = "shopcar.html"
                        } else {
                            return
                        }
                    })
                } else {
                    if (res.error == 400) {
                        setTimeout(function () {
                            location.href = "login.html"
                        }, 1000)

                    }
                    mui.toast(res.message)
                    return
                }


            }

        })

    })



})