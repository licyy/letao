//这里实现a标签的跳转
$(function(){
    $("body").on("tap","a",function(){
        mui.openWindow({
            url: $(this).attr('href')
        })
    })
})