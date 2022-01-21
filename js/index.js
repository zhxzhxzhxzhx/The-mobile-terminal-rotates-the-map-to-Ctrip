//fastclick插件解决300ms问题
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
window.addEventListener("load", function () {
    var foucs = this.document.querySelector(".foucs");
    var ul = foucs.children[0];
    var ol = foucs.children[1];
    var foucswidth = foucs.offsetWidth;
    var index = 0;
    var flag = false;
    var timer = setInterval(() => {
        index++;
        var translatex = -index * foucswidth;
        // console.log(translatex);
        ul.style.transition = "all .3s";
        ul.style.transform = "translateX(" + translatex + "px)";


    }, 2000);
    ul.addEventListener("transitionend", function () {
        if (index >= 3) {
            index = 0;
            var translatex = -index * foucswidth;
            // console.log(translatex);
            ul.style.transition = "none";
            ul.style.transform = "translateX(" + translatex + "px)";
        } else if (index < 0) {
            index = 2;
            var translatex = -index * foucswidth;
            // console.log(translatex);
            ul.style.transition = "none";
            ul.style.transform = "translateX(" + translatex + "px)";
        }
        ol.querySelector("li.current").classList.remove("current");
        ol.children[index].classList.add("current");
    })
    //手指滑动轮播图
    var startx = 0;
    var movex = 0;
    ul.addEventListener("touchstart", function (e) {
        startx = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener("touchmove", function (e) {
        movex = e.targetTouches[0].pageX - startx;
        var translatex = -index * foucswidth + movex;
        ul.style.transition = "none";
        ul.style.transform = "translateX(" + translatex + "px)";
        flag = true;//用户手指移动过再判断
        e.preventDefault();//阻止滚动
    })
    ul.addEventListener("touchend", function () {
        if (flag == true) {
            if (Math.abs(movex) >= 50) {
                if (movex > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * foucswidth;
                ul.style.transition = "all .3s";
                ul.style.transform = "translateX(" + translatex + "px)";
            } else {
                var translatex = -index * foucswidth;
                ul.style.transition = "all .3s";
                ul.style.transform = "translateX(" + translatex + "px)";
            }
        }
        clearInterval(timer);
        timer = setInterval(() => {
            index++;
            var translatex = -index * foucswidth;
            // console.log(translatex);
            ul.style.transition = "all .3s";
            ul.style.transform = "translateX(" + translatex + "px)";


        }, 2000);
    })
    //返回顶部
    var goback = this.document.querySelector(".goback");
    var nav = this.document.querySelector("nav");
    window.addEventListener("scroll", function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = "block";
        } else {
            goback.style.display = "none";
        }
    })
    goback.addEventListener("click", function () {
        window.scroll(0, 0);
    })
})