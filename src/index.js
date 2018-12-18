import Swiper from 'swiper'
import $ from 'zepto'
import zeptoEvent from 'zepto/src/event.js'
import zeptofx from 'zepto/src/fx.js'
import zeptofxMethod from 'zepto/src/fx_methods.js'
import zeptoTouch from 'zepto/src/touch.js'


import 'swiper/dist/css/swiper.css'
import './assets/stylus/index.styl'


var swiper = new Swiper('.swiper-container',{
    direction: 'vertical'
})

$('.loading').on('click',function(){
    $(this).fadeOut()
})
$('.welcome').on('click',function(){
    $(this).fadeOut()
})
