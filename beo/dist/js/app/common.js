
require(['js/vendor/toast.es6', 'js/vendor/validate.es6'], function(Toast){
  $('footer .btn').click(function(){
    var $form = $(this).closest('form');
    var error = $form.ValidateForm({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: {
          required: true,
          tel: true,
        },
        content: {
          required: true,
        },
      },
      messages: {
        name: {
          required: '请输入您的姓名',
        },
        phone: {
          required: '请输入您的电话',
        },
        content: {
          required: '内容不能为空',
        },
      }
    });
    if(error){
      $(error.element).focus();
      Toast({
        message: error.message
      });
      return;
    }
    console.log($form.serialize());
  });
  // 添加返回顶部
  $('body').append('<div class="go-top" style="display:none;"><ul><li class="go-top-img"></li><li class="go-top-txt">返回顶部</li></ul></div>');
  //回到顶部
  $(".go-top").on('click', function(){
    $("html,body").animate({scrollTop: 0},500);
  });
  $(window).scroll(function(){
    if( $(window).scrollTop() < 150 ){
      $(".go-top").slideUp(300);
    }else{
      $(".go-top").slideDown(300);
    }
  });
});