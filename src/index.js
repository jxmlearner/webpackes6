import Swiper from 'swiper'
import $ from 'zepto'
import zeptoEvent from 'zepto/src/event.js'
import zeptofx from 'zepto/src/fx.js'
import zeptofxMethod from 'zepto/src/fx_methods.js'
import zeptoTouch from 'zepto/src/touch.js'


import 'swiper/dist/css/swiper.css'
import './assets/stylus/index.styl'


var swiper = new Swiper('.swiper-container',{
    direction: 'vertical',
    on: {
        slideChangeTransitionEnd:function(swiper) {
            let index = this.activeIndex
            $('.swiper-slide').eq(index).addClass('animate').siblings().removeClass('animate');
        }
    }
})

$('.loading').on('animationend',function(){
    $(this).fadeOut(100,function(){
        $('.welcome').addClass('animate')
    })
})
// $('.welcome').on('click',function(){
//     $(this).fadeOut()
// })

//页面加载完成之后等待一小会时间，为页面添加animate类
setTimeout(()=> {
    $('.loading').addClass('animate')
},1000)

// page1的按钮长按
$('.welcome .rotate-btn-box').on('longTap',function(){
    $('.welcome .bear-box').css('animation','bearDisappear 1s forwards')   //动画的时候 最好用了animation就全部用animation,不要和transition混用
    // 让上面的动画执行完成后再页面消失
    setTimeout(()=> {
        $('.welcome').fadeOut(1000)
        $('.page1').addClass('animate')
    },1000)    
})
