(function ($, win) {
  'use strict';

  var Share = $.share = (function () {
    var
      maxHeightArray = [],

      $window = null,
      winWidth = 0,
      widthFlg = false,

      $dropDown = null,
      $dropDownList = null,
      $global_nav = null,
      $menuButton = null,
      $contentAccordion = null,
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
      $contentAccordion = $('.content_accordion');



      // --------------------------------------
      //  functions
      // --------------------------------------
      removeHoverCSSRule();
      resetCSS();
      dropdown();
      smoothScroll();
      navFixed();
      loadPage();
      menuButton();
      getMaxHeightMenuAccordion();
      accordioMenuSP();

      $window.on('resize', function () {
        winWidth = $window.width();
        widthFlg = (winWidth > 767) ? false : true;
        resetCSS();
        getMaxHeightMenuAccordion();
        accordioMenuSP();
      });
    }

    // --------------------------------------
    //  Get Max Height Menu Accordion
    // --------------------------------------
    function getMaxHeightMenuAccordion() {
      $('.global_nav_item').each(function (index, el) {
        if(widthFlg) {
          var $this = $(this).find('.content_accordion');
          var maxHeightTemp = $this.height();
          maxHeightArray.push(maxHeightTemp);
        }
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
      closeMenu();
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
    // --------------------------------------
    //  Close Menu
    // --------------------------------------
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
    //  Dropdown Menu
    // --------------------------------------
    function dropdown() {
      $dropDown.off().on({
        'mouseenter': function () {
          if(!widthFlg) {
            $(this).find($dropDownList).stop().velocity('fadeIn');
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
    // --------------------------------------
    //  Accordion Menu SP
    // --------------------------------------
    function accordioMenuSP() {
      $('.global_nav_item').each(function (index, el) {
        var $item = $(this).find('.btn_accordion');
        var pos = $(this).index();
        if(widthFlg) {
          if(!$item.hasClass('active')) {
            $(this).find('.content_accordion').css('max-height', '0');
          } else {
            $item.next('.content_accordion').css({
              'max-height': maxHeightArray[pos]
            })
          }
          $item.off().on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.stop().toggleClass('active');
            $this.parent().siblings()
              .find('.btn_accordion').removeClass('active')
              .next('.content_accordion').css('max-height', 0);
            if($this.hasClass('active')) {
              $this.next('.content_accordion').css({
                'max-height': maxHeightArray[pos]
              })
            } else {
              $this.removeClass('active');
              $this.next('.content_accordion').css({
                'max-height': '0'
              })
            }
          });
        }
      });
    }

    // --------------------------------------
    //  Content Load
    // --------------------------------------
    function loadPage() {
      $('.effect').velocity("transition.slideLeftIn", {
          stagger: 350
        })
        .delay(750);
    }

    // --------------------------------------
    //  Nav Fixed
    // --------------------------------------
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
    // --------------------------------------
    //  Smooth Scroll
    // --------------------------------------
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
    // --------------------------------------
    //  Reset CSS
    // --------------------------------------
    function resetCSS() {
      if(widthFlg) {
        $('.dropdown_list, .dropdown_list_item, .overlay, html').removeAttr('style');
      } else {
        $('.content_accordion').removeAttr('style');
      }
    }

    // --------------------------------------
    //  Remove Hover on SP
    // --------------------------------------
    function removeHoverCSSRule() {
      if('createTouch' in document) {
        try {
          var ignore = /:hover/;
          for(var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if(!sheet.cssRules) {
              continue;
            }
            for(var j = sheet.cssRules.length - 1; j >= 0; j--) {
              var rule = sheet.cssRules[j];
              if(rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
                sheet.deleteRule(j);
              }
            }
          }
        } catch(e) {}
      }
    }

    return {
      init: init
    };

  })();
  $(Share.init);

})(jQuery, window);
