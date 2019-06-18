$(function () {
    var page = 1
    var pageSize = 10
    var maxPage
    getDate()

    $("#prev").on("click", function () {
        page--
        getDate()
        console.log(page);
    })
    $("#next").on("click", function () {
        page++
        getDate()
        console.log(page);

    })


    //渲染二级目录
    $.ajax({
        url: "/category/querySecondCategoryPaging",
        type: "get",
        data: {
            "page": 1,
            "pageSize": 100,
        },
        success: function (res) {
            console.log(res);
            var html = ""
            for (var i = 0; i < res.rows.length; i++) {
                html += "<option id=" + res.rows[i].id + ">" + res.rows[i].brandName + "</option>"
            }
            // console.log(html);

            $("#secondBox").html(html)

        }
    })

    //图片上传
    $("#fileUpload").fileupload({
        url: "/product/addProductPic",
        type: "post",
        dataType: "json",
        done: function (e, data) {
            console.log(data.result);
            // 图片预览
            // $("#preview").attr("src", data.result.picAddr)
            var img = new Image()
            $(img).attr("src", data.result.picAddr)
            $(".preview").append(img)

        }
    })


    $("#addProduct").on("click", function () {
        var brandId = $("#secondBox").find("option:selected").attr("id")
        // console.log(categoryId);
        var proName = $("#proName").val()
        var oldPrice = $("#oldPrice").val()
        var price = $("#price").val()
        var proDesc = $("#proDesc").val()
        var size = $("#size").val()
        var statu = $("#statu").val()
        var num = $("#num").val()
        $.ajax({
            url: "/product/addProduct",
            type: "post",
            data: {
                proName,
                oldPrice,
                price,
                proDesc,
                size,
                statu,
                num,
                brandId,
            },
            beforeSend: function () {
                if (proName.trim() == "") {
                    alert("请输入产品名称")
                    return false
                }
                if (oldPrice.trim() == "") {
                    alert("请输入老价格")
                    return false
                }
                if (price.trim() == "") {
                    alert("请输入价格")
                    return false
                }
                if (proDesc.trim() == "") {
                    alert("请输入产品描述")
                    return false
                }
                if (size.trim() == "") {
                    alert("请输入产品尺寸")
                    return false
                }
                if (statu != 0 || status != 1) {
                    alert("产品上下架 1没下架 0下架")
                    return false
                }
                if (num.trim() == "" || (/^[0-9]*$/).test(num) == false) {
                    alert("请输入用户库存")
                    return false
                }
                if (brandId.trim() == "") {
                    alert("请输入商品归属品牌")
                    return false
                }
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    alert("添加成功")
                    location.reload()
                } else {
                    alert(res.msg)
                }
            }
        })
    })

//    //点击编辑按钮改变操作和状态文本
//    $("#productBox").on("click", ".btn-danger", function () {
//     var id = $(this).attr("data-id")
//     var isDelete = $(this).attr("data-isDelete")
//     isDelete = isDelete==1 ? 0 : 1
//     $.ajax({
//         url: "/user/updateUser",
//         type: "post",
//         data: {
//             id,
//             isDelete
//         },
//         success: function (res) {
//             console.log(res);
//             if (res.success) {
//                 getData()
//             }

//         }
//     })


    function getDate() {
        $.ajax({
            url: "/product/queryProductDetailList",
            type: "get",
            data: {
                "page": page,
                "pageSize": pageSize,
            },
            beforeSend: function () {
                if (page < 1) {
                    page = 1
                    alert("这已经是第一页了")
                    return false
                }
                if (page > maxPage) {
                    page = maxPage
                    alert("这已经是最后一页了")
                    return false
                }
            },
            success: function (res) {
                console.log(res);
                var html = template("productTpl", res)
                $("#productBox").html(html)
                var total = res.total
                maxPage = Math.ceil(total / pageSize)
            }
        })
    }

})