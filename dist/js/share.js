(function ($, win) {
  'use strict';

  var Share = $.share = (function () {
    var
      $window = null,
      winWidth = 0,
      widthFlg = false,
      $dropDown = null,
      $dropDownList = null,
      $global_nav = null,
      $menuButton = null,
      $btnAccordion = null;


    function init() {
      $window = $(window);
      winWidth = $window.width();
      widthFlg = (winWidth > 767) ? false : true;


      // --------------------------------------
      //  variable
      // --------------------------------------
      $dropDown = $('.dropdown');
      $dropDownList = $('.dropdown_list');
      $menuButton = $('.btn_menu');
      $global_nav = $('.global_nav');
      $btnAccordion = $('.btn_accordion');

      // --------------------------------------
      //  functions
      // --------------------------------------
      resetCSS();
      dropdown();
      smoothScroll();
      navFixed();
      // loadPage();
      closeMenu();
      menuButton();
      accordion();

      $window.on('resize', function () {
        winWidth = $window.width();
        widthFlg = (winWidth > 767) ? false : true;
        resetCSS();
      });
    }

    // --------------------------------------
    //  button menu
    // --------------------------------------
    function menuButton() {
      $menuButton.on('click', function (e) {
        e.preventDefault();
        $(this).stop()
          .toggleClass('open')
          .attr('aria-pressed', 'true');
        if($(this).hasClass('btn_menu_pull')) {
          menuPull();
        } else {
          if($(this).hasClass('open')) {
            if($global_nav.hasClass('global_nav_right')) {
              $('.global_nav_right')
                .addClass('show')
                .closest('html').css('overflow', 'hidden');
              $('.overlay').fadeIn(300);
            } else {
              $global_nav.closest('.header').addClass('header_show_global_nav')
            }
          } else {
            $(this)
              .attr('aria-pressed', 'false')
              .closest('.header').removeClass('header_show_global_nav')
            $('.global_nav_right')
              .removeClass('show')
              .closest('html').removeAttr('style');
            $('.overlay').removeAttr('style');
          }
        }
      });
    }
    // --------------------------------------
    //  Menu Pull
    // --------------------------------------
    function menuPull() {
      if($('.btn_menu').hasClass('open')) {
        $('.global_nav_pull').addClass('show');
        $('.overlay').fadeIn(300);
        $('body')
          .addClass('body_pull')
          .parent('html').css('overflow', 'hidden');
      } else {
        $('.btn_menu').attr('aria-pressed', 'false');
        $('.overlay').removeAttr('style');
        $('.global_nav_pull').removeClass('show');
        $('body')
          .removeClass('body_pull')
          .parent('html').removeAttr('style');;
      }
    }

    function closeMenu() {
      $('.overlay').on('click', function (e) {
        e.preventDefault();
        $('.btn_menu').attr('aria-pressed', 'false');
        $('.overlay').removeAttr('style');
        $('.global_nav_pull, .global_nav_right').removeClass('show');
        $('body')
          .removeClass('body_pull')
          .parent('html').removeAttr('style');
      });
    }
    // --------------------------------------
    //  dropdown menu
    // --------------------------------------
    function dropdown() {
      $dropDown.off().on({
        'mouseenter': function () {
          if(!widthFlg) {
            $(this).find($dropDownList).stop().velocity('fadeIn', 'fast', function () {
              $('.dropdown_list_item').stop().velocity('transition.slideLeftIn');
            });
          }
        },
        'mouseleave': function () {
          if(!widthFlg) {
            $(this).find($dropDownList).velocity('fadeOut', 100);
            $('.dropdown_list_item').removeAttr('style');
          }
        }
      });
    }

    function accordion() {
      $btnAccordion.each(function (index, el) {
        $(this).attr('aria-selected', 'true');
        console.log(1111);
      });
    }

    // --------------------------------------
    //  content load
    // --------------------------------------
    function loadPage() {
      $('.effect').velocity("transition.slideLeftIn", {
          stagger: 350
        })
        .delay(750);
    }

    // Nav Fixed
    function navFixed() {
      $window.scroll(function () {
        var $header = $(".header");
        var heightHeader = $header.height();
        $header.css('top', -heightHeader);
        if($window.scrollTop() > 100) {
          $header
            .addClass('fixed')
            .css('top', 0);
        } else {
          $header
            .removeClass('fixed')
            .removeAttr('style');
        }
      });
    }
    // smoothScroll
    function smoothScroll() {
      var $footer = $('footer');
      // var heightHeader = $('.top_header').height();
      $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        var h = $(this).attr("href");
        var t = $(h == "#" || h === "" ? 'body' : h);
        var p = t.offset().top;
        $('html,body').velocity("scroll", {
          duration: 500,
          offset: p
        });
        return false;
      });
    }

    function resetCSS() {
      if(widthFlg) {
        $('.dropdown_list, .dropdown_list_item, .overlay, html').removeAttr('style');
      }
    }
    return {
      init: init
    };

  })();
  $(Share.init);

})(jQuery, window);
