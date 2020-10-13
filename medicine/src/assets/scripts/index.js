$(function(){

    // loading动画 函数
    function loading_fn(callback = function(){}) {
        var i = 0,
            span = $('.loading span');

        function load() {
            i++;
            span.text(i + '%');
            if (i == 100) {
                window.cancelAnimationFrame(stops);
                callback();
            } else {
                stops = requestAnimationFrame(load);
            }
        }
        load();
    }
    // 气泡模糊动画 函数
    function bubble_fn(){
        var i = 20,
            img = $('.bubble_box img');

        function bubble_load() {
            i--;
            img.css({
                'filter': 'blur('+ i +'px) grayscale(1)',
            });
            if (i == 0) {
                img.css({
                    'filter': 'none',
                });
                window.cancelAnimationFrame(bubble_stops);
            } else {
                bubble_stops = requestAnimationFrame(bubble_load);
            }
        }
        bubble_load();
    }

    //气泡动画结束，添加另一个动画
    $('.bubble_box img').bind("webkitAnimationEnd", function () {
        setTimeout(function () {
            $('.bubble_box img').addClass("active");
        }, 1000)
    });

    // loading动画函数调用
    loading_fn(function(){
        $('.loading').fadeOut(500,function(){
            $('.fingerprint_box').fadeIn(1000);
        });
        bubble_fn();
    });

    // 指纹点击事件
    $('.fingerprint_img').on('click', function () {
        $('.fingerprint_box').fadeOut(500,function(){
            // 控制气泡移动
            $('.bubble_box img').addClass('on');
            // 气泡上方logo显示
            $('.logo_bg_title').delay(3000).fadeIn();
            //气泡中间文字显示
            $('.bubble_title').delay(3000).fadeIn();
            //下一页展示
            $('.one-slide').find('.next').fadeIn(1000);

        })
    })
    var mySwiper = new Swiper('.swiper-container', {
        on: {
            init: function () {
                swiperAnimateCache(this); //隐藏动画元素
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function () {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); // 动画只展现一次，去除ani类名
                if (this.slides.eq(this.activeIndex).find('.qr-scanner').length == 1) {
                    $('.scan_box').addClass('active')
                }
            }
        }
    });

    $('.logo').click(function () {
        mySwiper.slideTo(2, 1000, false); //切换到第一个slide，速度为1秒
        swiperAnimateCache(mySwiper);
        swiperAnimate(mySwiper);
    })
})