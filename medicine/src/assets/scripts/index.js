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

    // 创新研发 动画
    function twelve_slide_fn(callback = function(){}) {
        var y = 100;

        function twelve_load() {
            y--;
            $('.img_animated_box img').eq(1).css({
                'clip-path': 'inset(0% 0% '+ y +'% 0%)'
            })
            if (y == 0) {
                window.cancelAnimationFrame(twelve_stops);
                callback();
            } else {
                twelve_stops = requestAnimationFrame(twelve_load);
            }
        }
        twelve_load();
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
    var mySwiper = "";
    // 指纹点击事件
    $('.fingerprint_img').on('click', function () {
        $('.fingerprint_box').fadeOut(500,function(){

            // 控制气泡移动
            $('.bubble_box img').addClass('on');
            // 气泡上方logo显示
            $('.logo_bg_title').delay(2000).fadeIn();
            //气泡中间文字显示
            $('.bubble_title').delay(2000).fadeIn();
            //下一页展示
            $('.one-slide').find('.next').delay(2000).fadeIn();
            // swiper 初始化
            swiper_fn();
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
                    callback_swiper(this.activeIndex);
                }
            }
        });
    }

    function callback_swiper(index){
        if ($('.swiper_layout').eq(index).find('.qr-scanner').length == 1) {
            $('.scan_box').addClass('active');
            $('.organs_box img').eq(0).delay(300).fadeIn(1000);
            $('.organs_box img').eq(1).delay(700).fadeIn(1000);
            $('.organs_box img').eq(2).delay(1200).fadeIn(1000);
            $('.organs_box img').eq(3).delay(1600).fadeIn(1000);
            $('.organs_box img').eq(4).delay(2000).fadeIn(1000);
            $('.organs_box img').eq(5).delay(2500).fadeIn(1000);
            $('.organs_box img').eq(6).delay(3000).fadeIn(1000);
        }
        $('.twenty-slide').find('.shade').fadeOut();
        if (index == 0) {
            $('.home_nav').fadeOut();
        } else {
            $('.home_nav').fadeIn();
        }
        if (index == 19) {
            setTimeout(function () {
                $('.nineteen-slide').find('.banner_box img').addClass('active');
            }, 1500)
        }
        if (index == 12 && $('.img_animated_box').hasClass('active')) {
            twelve_slide_fn(function () {
                $('.img_animated_box').removeClass('active');
                $('.twelve-slide').find('.img_animated_box img').eq(2).fadeIn();
            })
        }
        if(index == 3 || index == 4 || index == 6 || index == 8){
            $('.swiper_layout').eq(index).find('.glide_hint').addClass('active');
            $('.swiper_layout').eq(index).find('.glide_hint').delay(2000).fadeOut(1000)
        }
        if (index == 6) {
            $('.seven-slide').find('.innovation_box_01').addClass('active');
            $('.seven-slide').find('.innovation_box_01 img').eq(1).delay(1000).fadeIn();
            $('.seven-slide').find('.innovation_box_02').addClass('active');
            $('.seven-slide').find('.innovation_box_02 img').eq(1).delay(1000).fadeIn();
        }
    }
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
    $('.nav_bar_box').on('click', '.tab_link', function () {
        var index = $(this).data('index');
        $('.nav_bar_box').removeClass('active');
        $('.nav_bar').fadeOut(function () {
            mySwiper.slideTo(index, 1000, false);
            swiperAnimateCache(mySwiper);
            swiperAnimate(mySwiper);
        })
        callback_swiper(index);
        if (index == 16) {
            setTimeout(function () {
                $('.nineteen-slide').find('.banner_box img').addClass('active');
            }, 1000)
        }
    })

// 第三屏

    $('.three-slide').on('click','.switch', function () {
        if ($('.desc_box').find('section').hasClass('active')){

            $('.desc_box').find('section').removeClass('active');
            $('.desc_box').find('.desc_01 div').eq(1).fadeOut(function () {
                $('.desc_box').find('.desc_01 div').eq(0).fadeIn();
            })
            $('.desc_box').find('.desc_02 div').eq(1).fadeOut(function () {
                $('.desc_box').find('.desc_02 div').eq(0).fadeIn();
            })
            $('.desc_box').find('.desc_03 div').eq(1).fadeOut(function () {
                $('.desc_box').find('.desc_03 div').eq(0).fadeIn();
            })
        }else{

            $('.desc_box').find('section').addClass('active');
            $('.desc_box').find('.desc_01 div').eq(0).fadeOut(function () {
                $('.desc_box').find('.desc_01 div').eq(1).fadeIn();
            })
            $('.desc_box').find('.desc_02 div').eq(0).fadeOut(function () {
                $('.desc_box').find('.desc_02 div').eq(1).fadeIn();
            })
            $('.desc_box').find('.desc_03 div').eq(0).fadeOut(function () {
                $('.desc_box').find('.desc_03 div').eq(1).fadeIn();
            })
        }
    })

// 第六屏

    $('.six_animation_click').one('click',function(){
        $('.six-swiper-box').css({
            'position':'relative'
        });
        $('.six-slide').css({
            'overflow-y': 'auto'
        })

        $('.six-swiper-box').addClass('on');
        $('.six-swiper-box').find('.history_line').addClass('active');
        $('.six-swiper-box').find('.history_box img').addClass('active');
        $('.six-slide').find('.glide_hint').fadeIn(function(){
            $('.six-slide').find('.glide_hint').addClass('active');
            $('.six-slide').find('.glide_hint').delay(2000).fadeOut(1000)
        });
    })

// 第七屏

    $('.seven-slide').on('click', '.switch', function () {
        if ($('.innovation').hasClass('active')) {

            $('.innovation').removeClass('active');
            $('.innovation_box_01').find('img').eq(2).fadeOut(function () {
                $('.innovation_box_01').find('img').eq(1).fadeIn();
            });
            $('.innovation_box_02').find('img').eq(2).fadeOut(function () {
                $('.innovation_box_02').find('img').eq(1).fadeIn();
            });
        } else {

            $('.innovation').addClass('active');
            $('.innovation_box_01').find('img').eq(1).fadeOut(function () {
                $('.innovation_box_01').find('img').eq(2).fadeIn();
            });
            $('.innovation_box_02').find('img').eq(1).fadeOut(function () {
                $('.innovation_box_02').find('img').eq(2).fadeIn();
            });
        }
    })

// 第八屏
    $('.eight-slide').on('click','.mask',function(){
        $('.eight-slide').find('.mask').fadeOut();
        $('.eight-slide').css({
            'overflow-y': 'auto'
        });
        $('.eight-slide').find('.glide_hint').fadeIn(function(){
            $('.eight-slide').find('.glide_hint').addClass('active');
            $('.eight-slide').find('.glide_hint').delay(2000).fadeOut(1000)
        });
    })
    $('.eight-slide').scroll(function () {
        if ($('.eight-slide').scrollTop() >= 730) {
            $('.eight-slide').find('.photo img').addClass('active');
        }
    });


// 第九屏

    $('.nine_animation_click').one('click',function(){
        $('.nine-slide-box').css({
            'position':'relative'
        });
        $('.nine-slide').css({
            'overflow-y': 'auto'
        });
        $('.nine-slide-box').addClass('on');
        $('.nine-slide-box').find('.history_line').addClass('active');
        $('.nine-slide-box').find('.history_box img').addClass('active');
        $('.nine-slide').find('.glide_hint').fadeIn(function(){
            $('.nine-slide').find('.glide_hint').addClass('active');
            $('.nine-slide').find('.glide_hint').delay(2000).fadeOut(1000)
        });
    })

// 第十屏
    var ten_swiper = new Swiper('.ten_swiper_box', {
        direction: 'vertical',
        slidesPerView: 3,
        autoHeight: true, //高度随内容变化
        initialSlide: 1,
        spaceBetween: 100,
        centeredSlides: true,
        centeredSlidesBounds: true,
        on: {
            slideChangeTransitionEnd: function(){
                if(this.activeIndex < 3){
                    $('.nav_list li').eq(0).addClass('active').siblings().removeClass('active');
                }else if(this.activeIndex > 2 && this.activeIndex < 7){
                    $('.nav_list li').eq(1).addClass('active').siblings().removeClass('active');
                }else if(this.activeIndex == 7){
                    $('.nav_list li').eq(2).addClass('active').siblings().removeClass('active');
                }else if(this.activeIndex == 8){
                    $('.nav_list li').eq(3).addClass('active').siblings().removeClass('active');
                }else if(this.activeIndex > 8 && this.activeIndex < 12){
                    $('.nav_list li').eq(4).addClass('active').siblings().removeClass('active');
                }else if(this.activeIndex > 11 && this.activeIndex < 15){
                    $('.nav_list li').eq(5).addClass('active').siblings().removeClass('active');
                }else if(this.activeIndex == 15){
                    $('.nav_list li').eq(6).addClass('active').siblings().removeClass('active');
                }
            }
        },
    });
    $('.nav_list li').on('click',function(){
        var slide = 0 , index = $(this).index();
        if(index == 0){
            slide = 0;
        }else if(index == 1){
            slide = 3;
        }else if(index == 2){
            slide = 7;
        }else if(index == 3){
            slide = 8;
        }else if(index == 4){
            slide = 9;
        }else if(index == 5){
            slide = 12;
        }else if(index == 6){
            slide = 15;
        }
        $(this).addClass('active').siblings().removeClass('active');
        ten_swiper.slideTo(slide, 1000, false);
    })

// 第十一屏
    $('.eleven-slide').on('click', '.video_select span',function(){
        var index = $(this).index();
        if($(this).hasClass('active')){
            return false;
        }else{
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.eleven-slide').find('.video_mp video').fadeOut(100);
            $('.eleven-slide').find('.video_mp video').eq(index).delay(150).fadeIn();
        }
    })

    $('.eleven-slide').on('click', '.educare div',function(){
        mySwiper.slideTo(11, 1000, false);
        swiperAnimateCache(mySwiper);
        swiperAnimate(mySwiper);
    });

// 第十三屏

    $('.twelve-slide').on('click','.mask',function(){
        $('.twelve-slide').find('.mask').fadeOut();
        $('.twelve-slide').css({
            'overflow-y': 'auto'
        })
    })

// 第十四屏
    new Swiper('.banner_swiper_box', {
        slidesPerView: 2,
        // autoplay: 3000,
        // loop : true,
        speed : 1000,
        autoplay : {
            delay : 1000,
            stopOnLastSlide : false,
            disableOnInteraction : true,
        },
        // spaceBetween: 30,
        centeredSlides: true,
    });
    $('.thirteen-slide').on('click','.mask',function(){
        $('.thirteen-slide').find('.mask').fadeOut();
        $('.thirteen-slide').css({
            'overflow-y': 'auto'
        })
    })

// 第十五屏

    var more_falg = 1;
    $('.fourteen-slide').on('click','.more_img',function(){
        if(more_falg == 1){
            $('.fourteen-slide').find('.content_box >div').eq(0).fadeOut(function(){
                $('.fourteen-slide').find('.content_box >div').eq(1).fadeIn();
            });
            more_falg = 2;
        }else if(more_falg == 2){
            $('.fourteen-slide').find('.content_box >div').eq(1).fadeOut(function(){
                $('.fourteen-slide').find('.content_box >div').eq(2).fadeIn();
            });
            more_falg = 3;
        }else if(more_falg == 3){
            $('.fourteen-slide').find('.content_box >div').eq(2).fadeOut(function(){
                $('.fourteen-slide').find('.content_box >div').eq(0).fadeIn();
            });
            more_falg = 1;
        }
    })


// 第十九屏

    $('.eighteen-slide').on('click','.content_title li',function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.eighteen-slide').find('.content_list').fadeOut(100)
        $('.eighteen-slide').find('.content_list').eq(index).delay(150).fadeIn();

    })

// 第二十屏
    $('.nineteen-slide').on('click','.content_list li',function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.nineteen-slide').find('.content_box div').fadeOut(100);
        $('.nineteen-slide').find('.content_box div').eq(index).delay(150).fadeIn();

    })

// 第二十一屏
    // $('.twenty-slide').on('click','.qr_code_box div',function(){
    //     var src = $(this).find('.code').attr('src');
    //     $('.twenty-slide').find('.shade img').attr('src',src);
    //     $('.twenty-slide').find('.shade').fadeIn();

    // })
})