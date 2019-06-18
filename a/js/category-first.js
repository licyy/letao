// import { template } from "handlebars";



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


    $("#save").on("click", function () {
        var categoryName = $(".form-control").val()


        $.ajax({
            url: "/category/addTopCategory",
            type: "post",
            data: {
                categoryName
            },
            beforeSend: function () {
                console.log(categoryName);
                if (categoryName.trim() == "") {
                    alert("请输入分类名称")
                    return false
                }
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    alert("添加成功")
                } else {
                    alert(res.msg)
                }


            }


        })
    })






    function getDate() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
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
                var html = template("categoryFirstTpl", res)
                $("#categoryFirstBox").html(html)
                var total = res.total
                maxPage = Math.ceil(total / pageSize)
            }
        })
    }

})