var page = 1
var pageSize = 4

//实现:根据传递过来的数据location.href获取数据
//获取传递过来的关键字keyword

var msg = location.href
var keyword = getKeyword(msg, "keyword")
console.log(keyword);

//设置默认价格排序时升序
var price = 1
//设置默认库存排序是升序
var num = 1

var that
//根据关键字ajax向服务器发送请求
$(function () {
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.   true页面刷新自动加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //将数据按照价格进行排序
    //1：给价格按钮绑定点击事件
    $("#priceSort").on("tap", function () {
console.log(11);

        //2：根据接口文档，ajax传递1升序，2降序
        price = (price == 1 )? 2 : 1
        /*
        if(price==1){
            price=2
        }else{
            price=1
        }
        */
        //3：对之前的数据进行初始化
        //清空页面数据
        $(".resultBox").html("")
        //恢复当前页面page=1
        page = 1
        //重新开启上拉加载数据
        mui('#refreshContainer').pullRefresh().refresh(true);

        getData.call(that)
    })

    //将数据按照库存进行排序
    //2：给库存按钮绑定点击事件
    $("#numSort").on("tap", function () {

        console.log(22);

        //2：根据接口文档，ajax传递1升序，2降序
        num = num == 1 ? 2 : 1

        //3：对之前的数据进行初始化
        //清空页面数据
        $(".resultBox").html("")
        //恢复当前页面page=1
        page = 1
        //重新开启上拉加载数据
        mui('#refreshContainer').pullRefresh().refresh(true);

        getData.call(that)
    })


})


//将获取搜索关键字封装成数组
//msg=>location.href  地址
//name=>关键字名称keyword
function getKeyword(msg, name) {
    //将获得的msg按？截取
    //先获取？在msg中的索引 indexOf()
    //substr()参数1：截取索引位置，包含当前元素;参数2：截取长度
    msg = msg.substr(msg.indexOf("?") + 1)
    //如果有多个参数之间用&相连，将msg按&分割成数组split()
    msg = msg.split("&")
    //我们需要的时传递过来的msg后面的值
    //循环数组中的每一个元素,将它们以=再分割，判断msg是否等于我们传递过来的值
    for (var i = 0; i < msg.length; i++) {
        var current = msg[i].split("=")
        if (current[0] = name) {
            return current[1]
        }
    }
}

// 将发送ajax请求封装成函数
function getData() {
    that = this
    $.ajax({
        url: "/product/queryProduct",
        type: "get",
        data: {
            "page": page++,
            "pageSize": pageSize,
            "proName": keyword,
            "price": price,
            "num": num
        },
        success: function (res) {
            console.log(res);

            if (res.data.length == 0) {
                //this.endPullupToRefresh(true)要求this指向的是mui.init()这个对象
                //$.ajax()里面this指向的是$，getData函数this谁调用指向谁
                //mui.init调用getData函数时，将getData中的this指向复制给全局变量that
                //在其他函数内部使用mui.init对象方法时，将this指向全局变量that 9
                return that.endPullupToRefresh(true);
            }

            var html = template("searchResult", res)
            $(".resultBox").append(html)

            that.endPullupToRefresh(false);
        }
    })
}