$(function () {
    //页面加载的时候就要判断localStorage里面是否有数据
    //ltkey是历史纪录名称
    //ltkeyArr是用来存储localStorage数据的数组
    //localStorage.getItem("ltkey")获得的是一个json格式的字符串
    //JSON.parse()将json格式字符串转换成json格式数组
    var ltkeyArr = JSON.parse(localStorage.getItem("ltkey"))
    //页面一加载就会获取localStorage数据，此时里面没有数据，返回值是null,此时认为的将ltkeyArr定义为数组
// console.log(ltkeyArr);

    if (!ltkeyArr) {
        ltkeyArr = []
    }
    console.log(ltkeyArr);
    //如果里面有数据，则将数据渲染到页面上，使用template模板
    var html = template("history", {
        data: ltkeyArr
    })
    // console.log(html);
    $("#history-box").html(html)





    $("#searchBtn").on("click", function () {

        var keyword = $("#searchText").val() //$(this).siblings().val()  这是一个字符串
        console.log(keyword.trim());

        if (keyword.trim().length == 0) {
            return mui.alert("请输入正确内容")
        }
        location.href = "search-result.html?keyword=" + keyword
        // location.assign("search-result.html?keyword=" + keyword)
        //点击搜索按钮之后，将搜索关键字keyword记录在localStorage中
        if (ltkeyArr.length > 0) {
            ltkeyArr.forEach(function () {
                if (ltkeyArr.indexOf(keyword) == "-1") {
                    ltkeyArr.push(keyword)
                }
            })
        } else {
            ltkeyArr.push(keyword)
        }

        localStorage.setItem("ltkey", JSON.stringify(ltkeyArr))

    })

    $(".history-clear").on("click", function () {
        mui.confirm("确认删除历史纪录？", function (data) {
            console.log(data);
            if (data.index == 1) {
                $("#history-box").html("")
                localStorage.removeItem("ltkey")
            }
        })

    })

    $("#history-box").on("click", "li", function () {
        $("#searchText").val($(this).html())
    })

    // 保存history逻辑
    // 1:创建一个数组用来保存输入的数据
    // 2：将数组保存到history中localStorage.setItem("名称"，字符串),保存的数据必须是一个字符串
    // 3：在页面刷新的时候将localStorage里面的数据取出来渲染到界面上

    //json是一种书写数据的格式，数组或者对象里面的值以键值对的方式存在key:value,并且key用引号包起来
    //JSON.parse()将json格式字符串转换成数组或者对象
    //JSON.stringify()将是Json格式的数组或者对象转换成json格式的字符串

    //为什么要用json：在渲染的时候需要对数据进行遍历，也就需要一个数组或者对象，而传递给localStorage的是一个字符串，而数组更加方便于记录数据，JSON.parse()和JSON.stringify()可以将数据在数组和字符串之间相互转换，所以先将数据存储在数组中通过JSON.stringify()转换成字符串传递给localStorage，再在获取localStorage数据时通过JSON.parse()转换成数组或者对象，方便循环遍历

    //页面加载的时候就要判断localStorage里面是否有数据


})