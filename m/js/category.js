$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url: "/category/queryTopCategory",
        type: "get",
        success: function (res) {
            var html = template("TopCategory", res)
            $("#TopCategoryList").html(html);
            $("#TopCategoryList").find("li:first-of-type").addClass("active");
            // $("#TopCategoryList").find("li").eq(1).addClass("active");
            var dataid=res.rows[0].id
            getSecondList(dataid)
        }
    })
    $("#TopCategoryList").on('click', 'li', function (dataid) {
        // console.log(this);
        var dataid = $(this).attr("data-id")
        console.log(dataid);
        $(this).addClass("active").siblings().removeClass("active")

        // $.ajax({
        //     url:"/category/querySecondCategory",
        //     type:"get",
        //     data:{
        //         id:dataid
        //     },
        //     success:function(res){
        //         console.log(res);
        //         var html =template("SecondCategory",res)
        //         console.log(html);
        //         $("#SecondCategoryList").html(html);

        //     }
        // })
        getSecondList(dataid)

    })

function getSecondList(dataid){
    $.ajax({
        url:"/category/querySecondCategory",
        type:"get",
        data:{
            id:dataid
        },
        success:function(res){
            // console.log(res);
            var html =template("SecondCategory",res)
            // console.log(html);
            $("#SecondCategoryList").html(html);

        }
    })

}







})