/*global $, console, alert*/
$(function () {

  'use strict';


  $("body").niceScroll({
    cursorcolor: "#08526d",
    cursorwidth: "8",
    cursorminheight: "80"
  });

  $(".header").niceScroll({
    cursorcolor: "#08526d",
    cursorwidth: "8",
    cursorminheight: "20",
    display : "none"
  });



  $('.menu-activea, .header-container').height($(window).height());
  $(window).resize(function () {
    $('.header-container').height($(window).height());
  });




  var menu = $('.menu-activea');

  $('.menu-activea h4').on('click', function () {

    menu.toggleClass('show-menu', 'hide-menu');

    if (menu.hasClass('show-menu')) {

      $('.header').animate({

        paddingLeft: menu.innerWidth()
      }, 500);

    } else {

      $('.header').animate({

        paddingLeft: 0
      }, 500);

    }

  });




  $('.copyright i').on('click', function () {

    $('html, body').animate({scrollTop : '0'}, 1300);
  });





  $('.header .user-i, .header .finger-i, .header .message-i, .header .screen-i, .header .cam-i ').on('click', function () {
  

    $('html, body').animate({scrollTop : ($($(this).data('scroll')).offset().top) + 1}, 1500);
  });




});
