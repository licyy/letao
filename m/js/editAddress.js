$(function () {

    //获取localStorage里面的数据
    var addrArr = JSON.parse(localStorage.getItem("currentAddr"))
    console.log(addrArr);
    var address = addrArr.address
    var addressDetail = addrArr.addressDetail
    var recipients = addrArr.recipients
    var postcode = addrArr.postCode
    var id=addrArr.id
    $("#address").val(address)
    $("#addressDetail").val(addressDetail)
    $("#recipients").val(recipients)
    $("#postcode").val(postcode)


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
        address = $("#address").val()
        addressDetail = $("#addressDetail").val()
        recipients = $("#recipients").val()
        postcode = $("#postcode").val()
        $.ajax({
            url: "/address/updateAddress",
            type: "post",
            data: {
                id,
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
                    mui.toast("修改成功")
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

        mui.toast("取消修改")
        setTimeout(function () {
            location.assign("address-list.html")
        }, 1000)

    })

})