
require(['js/vendor/modal.es6', 'js/vendor/toast.es6', 'js/vendor/cookie.es6', 'js/vendor/validate.es6', 'js/vendor/placeholder.es6'], function(Modal, Toast, Cookie){
  // 点击退出
  $('.logout').click(function(){
    console.log('logout');
  });
  var contentHtml = "<div id=\"login-card\" class=\"content\"><form class=\"my-form\"><p class=\"tc\"><i class=\"icon i-logo\"></i></p><p><input class=\"my-form-control\" name=\"phone\" placeholder=\"请输入手机号\"></p><p><input class=\"my-form-control\" name=\"password\" placeholder=\"请输入密码\"></p><p><a href=\"javascript:void(0);\" class=\"fr text-9b9b9b changeCard\" data-target=\"#forget-card\">忘记密码？</a><label class=\"checkbox\"><input type=\"checkbox\" name=\"remember\"><span>记住我</span></label></p><div class=\"btns\"><button type=\"button\" class=\"btn btn-primary btn-large\">立即登录</button></div></form><div id=\"login-card-btm\"><button type=\"button\" class=\"btn changeCard btn-signin\" data-target=\"#signin-card\">立即注册</button>还没有闯关王账号？立即加入！</div></div><div id=\"signin-card\" class=\"content\"><div class=\"my-modal-title\">注册账号</div><form class=\"my-form\"><p><input class=\"my-form-control\" name=\"name\" placeholder=\"请输入您的昵称\"></p><p><input class=\"my-form-control\" name=\"phone\" placeholder=\"请输入您的手机号\"></p><p class=\"my-form-group\"><button type=\"button\" class=\"btn my-form-addon getCode\">获取验证码</button> <input class=\"my-form-control\" name=\"code\" placeholder=\"请输入验证码\"></p><p><input class=\"my-form-control\" name=\"password\" placeholder=\"请输入密码\"></p><p><input class=\"my-form-control\" name=\"rePassword\" placeholder=\"请确认密码\"></p><div class=\"btns\"><button type=\"button\" class=\"btn btn-primary btn-large mb20\">注册</button> <a href=\"javascript:void(0);\" class=\"link changeCard\" data-target=\"#login-card\">返回登录</a></div></form></div><div id=\"forget-card\" class=\"content\"><div class=\"my-modal-title\">找回密码</div><form class=\"my-form\"><p><input class=\"my-form-control\" name=\"phone\" placeholder=\"请输入您的手机号\"></p><p class=\"my-form-group\"><button type=\"button\" class=\"btn my-form-addon getCode\">获取验证码</button> <input class=\"my-form-control\" name=\"code\" placeholder=\"请输入验证码\"></p><p><input class=\"my-form-control\" name=\"password\" placeholder=\"请输入新密码\"></p><p><input class=\"my-form-control\" name=\"rePassword\" placeholder=\"请确认新密码\"></p><div class=\"btns\"><button type=\"button\" class=\"btn btn-primary btn-large mb20\">确定</button> <a href=\"javascript:void(0);\" class=\"link changeCard\" data-target=\"#login-card\">返回登录</a></div></form></div>";
  var cardId = 0;
  // 点击登录
  $(document).on('click', '.login', function(){
    cardId = Modal.confirm({
      skin: 'my-modal-card',
      content: contentHtml,
      btns: null,
      beforeShow: function(){
        $(this).find('#login-card').addClass('on')
      }
    });
  });
  // 点击注册
  $(document).on('click', '.signin', function(){
    cardId = Modal.confirm({
      skin: 'my-modal-card',
      content: contentHtml,
      btns: null,
      beforeShow: function(){
        $(this).find('#signin-card').addClass('on');
      }
    });
  });
  // 切换到注册,登录,忘记密码
  $(document).on('click', '.changeCard', function(){
    $($(this).data('target')).addClass('on').siblings().removeClass('on');
  });
  // 点击获取验证码
  $(document).on('click', '.getCode:not(.disabled)', function(){
    var $el = $(this).addClass('disabled');
    var txt = $el.text();
		var time = 60;
		var id = setInterval(countDown, 1000);
		function countDown(){
			if(time > 0){
				$el.text('已发送(' + --time + 's)');
			}else{
				$el.text(txt).removeClass('disabled');
				clearInterval(id);
			}
		}
		countDown();
  });
  // 登录提交
  $(document).on('click', '#login-card .btn-large', function(){
    var $form =$(this).closest('.my-form');
    var error = $form.ValidateForm({
      rules: {
        phone: {
          required: true,
          tel: true
        },
        password: {
          required: true
        }
      },
      messages: {
        phone: {
          required: '请输入您的手机号'
        }
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
  // 注册提交
  $(document).on('click', '#signin-card .btn-large', function(){
    var $form =$(this).closest('.my-form');
    var error = $form.ValidateForm({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: {
          required: true,
          tel: true
        },
        code: {
          required: true
        },
        password: {
          required: true,
          equalTo: '#signin-card [name=rePassword]'
        },
        rePassword: {
          required: true
        }
      },
      messages: {
        phone: {
          required: '请输入您的手机号'
        },
        password: {
          equalTo: '两次输入密码一不致'
        }
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
    Modal.close(cardId, false);
    var id = Modal.confirm({
      title: '注册成功',
      content: '恭喜您！<br/>成为我们的新用户。',
      btns: [
        {
          cls: 'btn btn-primary btn-large login',
          txt: '立即登录',
          onClick: function () {
            Modal.close(id);
          }
        }
      ]
    });
  });
  // 忘记密码提交
  $(document).on('click', '#forget-card .btn-large', function(){
    var $form =$(this).closest('.my-form');
    var error = $form.ValidateForm({
      rules: {
        phone: {
          required: true,
          tel: true
        },
        code: {
          required: true
        },
        password: {
          required: true,
          equalTo: '#forget-card [name=rePassword]'
        },
        rePassword: {
          required: true
        }
      },
      messages: {
        phone: {
          required: '请输入您的手机号'
        },
        password: {
          equalTo: '两次输入密码一不致'
        }
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
    Modal.close(cardId, false);
    var id = Modal.confirm({
      title: '创建新密码成功',
      content: '恭喜您！<br/>您已成功创建新密码。',
      btns: [
        {
          cls: 'btn btn-primary btn-large login',
          txt: '立即登录',
          onClick: function () {
            Modal.close(id);
          }
        }
      ]
    });
  });
});