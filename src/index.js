import Swiper from 'swiper'
import $ from 'zepto'
import zeptoEvent from 'zepto/src/event.js'
import zeptofx from 'zepto/src/fx.js'
import zeptofxMethod from 'zepto/src/fx_methods.js'
import zeptoTouch from 'zepto/src/touch.js'


import 'swiper/dist/css/swiper.css'
import './assets/stylus/index.styl'

let intervalBear

var swiper = new Swiper('.swiper-container',{
    direction: 'vertical',
    on: {
        slideChangeTransitionEnd:function() {
            // console.log(this)
            let index = this.activeIndex
            $('.swiper-slide').eq(index).addClass('animate').siblings().removeClass('animate');
            if(index === 2){
                $('.swiper-slide').eq(index).addClass('swiper-no-swiping')
            }
            if(this.previousIndex===2){ //如果是从第3页滑过来的, 把第3页因为动画添加的style全部清除掉
                $('.swiper-slide').eq(2).find('.bear').attr('style','')
                $('.animation-bear-box div').attr('style','')
                $('.normal-card div').attr('style','')
                $('.hit-card-box div').attr('style','')
            }
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


$('.swiper-slide').eq(2).click(function() {
    //$(this).removeClass('swiper-no-swiping')
    //把最开始显示的熊隐藏起来
    //$(this).children('.bear').css('opacity',0)  //使用这种方式隐藏不了-->因为元素上有animation
    $(this).children('.bear').css('animation','none')
    let index = 0;
    var _this = this
    intervalBear = setInterval(() => {
        $(this).find('.animation-bear-box').children().eq(index).show().siblings().hide()

        // 隐藏 normal-card 容器中的牌子
        $('.normal-card div').eq(index).css('animation','none')
        // 显示被踢的第几个牌子
        $('.hit-card-box div').eq(index).css('opacity',1)

        if(index==2){
            clearInterval(intervalBear)
            $('.hit-card-box div').css('animation','bearDisappear 1.5s forwards')
            setTimeout(()=> {
                $(_this).removeClass('swiper-no-swiping')
            },1500)
        }
        index++
    }, 1000);
})

// 播音乐
$('.audioControl').on('click',function(){
    let audioDom = document.querySelector('audio')
    if(audioDom.paused) {
        audioDom.play()
        $(this).addClass('pause')
    }else {
        audioDom.pause()
        $(this).removeClass('pause')
    }
})