function scrollToElement(target, offset) {
  var scroll_offset = $(target).offset();
  $("body,html").animate({
    scrollTop: scroll_offset.top + (offset || 0),
    easing: 'swing'
  })
}

function scrollToBoard() {
  scrollToElement('#board', -$("#navbar").height());
}

document.getElementById('board').onload = scrollToBoard;


$(document).ready(function () {
  var navbar = $("#navbar");
  if (navbar.offset().top > 0) {
    navbar.addClass("navbar-custom");
    navbar.removeClass("navbar-dark");
  }
  $(window).scroll(function () {
    if (navbar.offset().top > 0) {
      navbar.addClass("navbar-custom");
      navbar.removeClass("navbar-dark");
    } else {
      navbar.addClass("navbar-dark");
    }
  });
  $('#navbar-toggler-btn').on('click', function () {
    $('.animated-icon').toggleClass('open');
    $('#navbar').toggleClass('navbar-col-show');
  });

  NProgress.start();
  window.onload = function () {
    NProgress.done();
  };

  // 向下滚动箭头的点击
  $(".scroll-down-bar").on("click", scrollToBoard);

  // 向顶部滚动箭头
  var topArrow = $("#scroll-top-button");
  var posDisplay = false;
  var scrollDisplay = false;
  // 位置
  var setTopArrowPos = function () {
    var boardRight = document.getElementById('board').getClientRects()[0].right;
    var bodyWidth = document.body.offsetWidth;
    var right = bodyWidth - boardRight;
    posDisplay = right >= 50;
    topArrow.css({
      "bottom": posDisplay && scrollDisplay ? "20px" : "-60px",
      "right": right - 64 + "px"
    });
  };
  setTopArrowPos();
  $(window).resize(setTopArrowPos);
  // 显示
  var headerHeight = $("#board").offset().top;
  $(window).scroll(function () {
    var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
    scrollDisplay = scrollHeight >= headerHeight;
    topArrow.css({
      "bottom": posDisplay && scrollDisplay ? "20px" : "-60px"
    });
  });
  // 点击
  topArrow.on("click", function () {
    $("body,html").animate({
      scrollTop: 0,
      easing: 'swing'
    })
  });
});
