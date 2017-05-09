(function ($, win) {
  'use strict';

  var Slider = $.slider = (function () {
    var
      $window = null,
      winWidth = 0,
      widthFlg = false;

    function init() {
      $window = $(window);
      winWidth = $window.width();
      widthFlg = (winWidth > 767) ? false : true;

      Slider();

    }

    function Slider() {
      setWidth();
      var mySwiper = $('.swiper-container').swiper({
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 3,
        autoplay: 3000,
        speed: 1000,
        centeredSlides: true,
        nested: true,
        autoplayDisableOnInteraction: false,
        runCallbacksOnInit: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      });

      $('.slider_btn_next').click(function () {
        mySwiper.detachEvents();
        mySwiper.slideNext();
        mySwiper.attachEvents();
      });

      $('.slider_btn_prev').click(function () {
        mySwiper.detachEvents();
        mySwiper.slidePrev();
        mySwiper.attachEvents();
      });

      $(window).on('load resize', function () {
        winWidth = $window.width();
        widthFlg = (winWidth > 767) ? false : true;
        if(winWidth <= 1024) {
          mySwiper.params.slidesPerView = 1;
          mySwiper.params.centeredSlides = false;
          $('.slider_btn_next').removeAttr('style');
          $('.slider_btn_prev').removeAttr('style');
        }
        mySwiper.update()
      })
      $(window).trigger('load resize')
    }

    function setWidth() {
      $(window).on('load resize', function (e) {
        e.preventDefault();
        var heightSlider = $('.slider').height();
        var thumbnail = $('.slider_thumnail').height();

        var widthWrapper = $('.slider').width();
        var widthWin = $(window).width();
        var widthOverlay = (widthWin - widthWrapper) / 2;

        $('.main_visual_wrapper').css('padding-bottom', thumbnail + 20);
        $('.slider_thumnail').css('bottom', -(thumbnail + 20));

        $('.slider_btn_next').css({
          'width': widthOverlay,
          'right': -widthOverlay,
          'background-color': 'rgba(0, 0, 0, 0.3)'
        })
        $('.slider_btn_prev').css({
          'width': widthOverlay,
          'left': -widthOverlay,
          'background-color': 'rgba(0, 0, 0, 0.3)'
        })
      });
    }
    return {
      init: init
    };

  })();
  $(Slider.init);

})(jQuery, window);
