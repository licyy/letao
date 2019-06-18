//在页面加载之前进行登陆拦截
//异步指的是当前内容加载和其他内容加载是独立的，同时执行的
//同步指的是，按照js语言单线程的特点，依次执行
$.ajax({
    url: "/employee/checkRootLogin",
    type: "get",
    //用户未登陆不应该加载下面的内容，所以这次请求是同步的
    async: false,
    success: function (res) {
        if (res.error && res.error == 400) {
            alert("您未登陆，请登陆")

           location.assign("login.html")

        }
    }
})




$(function () {

    //点击退出按钮退出
    $(".login_out_bot").on("click", function () {
        var bool = confirm("是否退出登陆")
        if (bool) {
            $.ajax({
                url: "/employee/employeeLogout",
                type: "get",
                success: function (res) {
                    if (res.success) {
                        setTimeout(() => {
                            location.href = "login.html"
                        }, 1000);
                    } else {
                        alert(res.message)
                        return
                    }
                }
            })
        }
    })





})