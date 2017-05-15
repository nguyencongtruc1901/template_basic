(function ($, win) {
  'use strict';

  var Lightbox = $.lightbox = (function () {
    var

      slideIndex = 0,
      $slides = null,
      $thumbnail = null,

      $lightbox = null,
      $modalContent = null;


    function init() {
      $lightbox = $('.lightbox');
      $slides = $('.lightbox_slider_item');
      $modalContent = $('.lightbox_slider');
      lightbox();
      paginationSlide();
    }

    function slideshow(n) {
      slideIndex += n;
      if(slideIndex >= $slides.length) {
        slideIndex = 0;
      } else if(slideIndex < 0) {
        slideIndex = $slides.length - 1;
      }
      for(var i = 0; i < $slides.length; i++) {
        $slides.eq(i).css('display', 'none');
      }
      $slides.eq(slideIndex).css('display', 'block');
    }

    function paginationSlide() {
      $('.next').click(function () {
        slideshow(1);
      });
      $('.prev').click(function () {
        slideshow(-1);
      });
    }

    function lightbox() {
      $('.lightbox').each(function (index, el) {
        var $item = $(this).find('.lightbox_item');
        $item.on('click', function (e) {
          var current = $(this).index();
          slideIndex = current; // Set Current Item When CLick
          slideshow(0);
          e.preventDefault();
          $(this).stop().toggleClass('open');
          if($(this).hasClass('open')) {
            $(this).parent().next().addClass('lightbox_slider_show').find('.lightbox_slider_container').addClass('show');
            $('.lightbox_slider_overlay').fadeIn(300);
            $('body').append('<div class="lightbox_slider_overlay"></div>');
            closeLightBox();
          } else {
            $(this).closest('html').find('.lightbox_slider.' + id).removeClass('lightbox_slider_show').find('.lightbox_slider_container').removeClass('show');
            $('.lightbox_slider_overlay').remove();
          }
        });
      });
    }

    function closeLightBox() {
      $('.lightbox_slider_overlay').off().on('click', function (e) {
        e.preventDefault();
        $('.lightbox_item').removeClass('open');
        $modalContent.removeClass('lightbox_slider_show').find('.lightbox_slider_container').removeClass('show');
        $('.lightbox_slider_overlay').remove();
      });
    }
    return {
      init: init
    };

  })();
  $(Lightbox.init);

})(jQuery, window);
