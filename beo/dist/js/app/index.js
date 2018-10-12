
require(['js/vendor/index.es6'], function(){
  // carousel
  $('.banner .my-carousel').Carousel({
    animationSpeed: 1000
  });
  $('#home-memorabilia .my-carousel').Carousel({
    autoplay: false,
    type: 'card',
    indicator: 'outside',
    easing: 'easeInOutQuad',
    onChange: function(index){
      $('#home-memorabilia .content li').eq(index).show().siblings().hide();
    }
  });
  $('#home-memorabilia .my-carousel-arrow-left').click(function(){
    $('#home-memorabilia .my-carousel').Carousel('prev');
  });
  $('#home-memorabilia .my-carousel-arrow-right').click(function(){
    $('#home-memorabilia .my-carousel').Carousel('next');
  });
});