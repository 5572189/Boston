$(function(){



    
    var mySwiper = new Swiper('.swiper-container', {
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
    $('.logo').click(function () {
        mySwiper.slideTo(2, 1000, false); //切换到第一个slide，速度为1秒
        swiperAnimateCache(mySwiper);
        swiperAnimate(mySwiper);
    })
})