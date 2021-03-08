$(function(){

    // loading动画 函数
    function loading_fn(callback = function(){}) {
        var i = 0,
            y = 100,
            span = $('.loading span');

        function load() {
            i++;
            y--;
            span.text(i + '%');
            $('.title_show').css({
                'clip-path': 'polygon(0% ' + y + '%, 100% ' + y + '%, 100% 100%, 0% 100%)'
            })
            if (i == 100) {
                window.cancelAnimationFrame(stops);
                callback();
            } else {
                stops = requestAnimationFrame(load);
            }
        }
        load();
    }


// 第一屏

    //气泡动画结束，添加另一个动画
    $('.bubble_box img').bind("webkitAnimationEnd", function () {
        setTimeout(function () {
            $('.bubble_box img').addClass("active");
        }, 1000)
    });

    // loading动画函数调用
    loading_fn(function(){
        $('.loading').fadeOut(500,function(){
            $('.click_title').fadeIn(1000);
        });
    });
    var mySwiper = "";
    // 指纹点击事件
    $('.click_title').on('click', function () {
        $('.loding_banner').fadeOut(500, function () {
            $('.logo_banner_01').addClass('active');
            $('.logo_banner_02').addClass('active');
            $('.logo_banner_03').addClass('active');
            // 控制气泡移动
            $('.bubble_box img').addClass('on');
            // 气泡上方logo显示
            $('.logo_bg_title').delay(2000).fadeIn();
            //气泡中间文字显示
            $('.bubble_title').delay(2000).fadeIn();
            //下一页展示
            $('.one-slide').find('.next').delay(2000).fadeIn();
            // swiper 初始化
            // swiper_fn();
        })
    })
    function swiper_fn(){
        mySwiper = new Swiper('.layout_swiper_box', {
            on: {
                init: function () {
                    swiperAnimateCache(this); //隐藏动画元素
                    swiperAnimate(this); //初始化完成开始动画
                },
                slideChangeTransitionEnd: function () {
                    swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                    this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); // 动画只展现一次，去除ani类名

                }
            }
        });
    }


})