$(function () {
    var page = 1
    var pageSize = 10
    var maxPage
    //渲染数据
    getDate()
    //点击上一页
    $("#prevBtn").on("click", function () {
        page--
        getDate()
        // console.log(page);
    })
    //点击下一页
    $("#nextBtn").on("click", function () {
        page++
        getDate()
        // console.log(page);
    })

    //渲染二级目录
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        type: "get",
        data: {
            "page": 1,
            "pageSize": 100,
        },
        success: function (res) {
            console.log(res);
            var html = ""
            for (var i = 0; i < res.rows.length; i++) {
                html += "<option id=" + res.rows[i].id + ">" + res.rows[i].categoryName + "</option>"
            }
            // console.log(html);

            $("#categoryFirstBox").html(html)

        }
    })

    //图片上传
    $("#fileUpload").fileupload({
        url: "/category/addSecondCategoryPic",
        type: "post",
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            // 图片预览
            $("#preview").attr("src", data.result.picAddr)

            $("#preview").css({
                width: "200px",
                height: "200px"
            })
        }
    })

    $("#save").on("click", function () {
        var categoryId = $("#categoryFirstBox").find("option:selected").attr("id")
        // console.log(categoryId);
        var brandName = $("#brandName").val()
        var brandLogo = $("#preview").attr("src")
        $.ajax({
            url: "/category/addSecondCategory",
            type: "post",
            data: {
                brandName,
                categoryId,
                brandLogo,
                "hot": 0

            },
            beforeSend: function () {
                if (brandName.trim() == "") {
                    alert("请输入品牌名称")
                    return false
                }
                if (brandLogo.trim() == "") {
                    console.log(brandLogo);

                    alert("选择品牌图片")
                    return false
                }
                if (categoryId.trim() == "") {
                    alert("请输入商品分类")
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






    function getDate() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
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
                var html = template("categorySecondTpl", res)
                $("#categorySecondBox").html(html)
                var total = res.total
                maxPage = Math.ceil(total / pageSize)
            }
        })
    }

})