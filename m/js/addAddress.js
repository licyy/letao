$(function () {

    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);

    $("#address").on("click", function () {

        picker.show(function (selectItems) {
            // console.log(selectItems);
            $("#address").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })

    $("#enter").on("click", function () {
        var address = $("#address").val()
        var addressDetail = $("#addressDetail").val()
        var recipients = $("#recipients").val()
        var postcode = $("#postcode").val()
        $.ajax({
            url: "/address/addAddress",
            type: "post",
            data: {
                address,
                addressDetail,
                recipients,
                postcode,
            },
            beforeSend: function () {
                if (!address) {
                    mui.toast("请选择地址")
                    return false
                }
                if (!addressDetail) {
                    mui.toast("请输入详细地址")
                    return false
                }
                if (!recipients) {
                    mui.toast("输入收货人")
                    return false
                }
                if (!postcode) {
                    mui.toast("请输入邮编")
                    return false
                }
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    mui.toast("添加成功")
                    setTimeout(function () {
                        location.assign("address-list.html")
                    }, 1000)
                } else {
                    mui.toast(res.msg)
                }

            }
        })
    })

    $("#cancel").on("click", function () {

        mui.toast("取消添加")
        setTimeout(function () {
            location.assign("address-list.html")
        }, 1000)

    })


})