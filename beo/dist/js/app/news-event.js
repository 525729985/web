
require([], function(){
  // 悬浮显示图片
  $('.news-list li').each(function(){
    var $img = $(this).find('.news-list-img');
    $(this).mouseenter(function(){
      $img.fadeIn(500);
    }).mousemove(function(e){
      $img.offset({ top: e.pageY + 5, left: e.pageX + 15 });
    }).mouseleave(function(){
      $img.hide();
    });
  });
});