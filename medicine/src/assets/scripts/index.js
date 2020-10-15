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
                // 'width': i+'%',
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
                    $('.scan_box').addClass('active');
                    $('.organs_box img').eq(0).delay(1000).fadeIn(1500);
                    $('.organs_box img').eq(1).delay(1400).fadeIn(1500);
                    $('.organs_box img').eq(2).delay(1800).fadeIn(1500);
                    $('.organs_box img').eq(3).delay(2200).fadeIn(1500);
                    $('.organs_box img').eq(4).delay(2600).fadeIn(1500);
                    $('.organs_box img').eq(5).delay(3000).fadeIn(1500);
                    $('.organs_box img').eq(6).delay(3500).fadeIn(1500);
                }
            }
        }
    });

// 第二屏

    // 导航点击事件
    $('.home_nav').click(function(){
        $('.nav_bar').show(function(){
            $('.nav_bar_box').addClass('active');
        })
    });
    // 导航关闭
    $('.logo_close').on('click','.close',function(){
        $('.nav_bar_box').removeClass('active');
        $('.nav_bar').fadeOut(1000);
    });
    // 导航内的标题点击事件
    $('.nav_bar_box').on('click','ul li',function(){
        var index = $(this).index();
        $('.nav_bar_box').removeClass('active');
        $('.nav_bar').fadeOut(function(){
            mySwiper.slideTo(index, 1000, false);
            swiperAnimateCache(mySwiper);
            swiperAnimate(mySwiper);
        });
    })

// 第三屏

    $('.switch').click(function(){
        $('.desc_box').find('section').toggleClass('active');
    })

// 第六屏

    $('.animation_click').one('click',function(){
        $('.six-swiper-box').addClass('on');
        $('.history_box').find('.history_line').addClass('active');
        $('.history_box img').addClass('active');
    })
})