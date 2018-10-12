
require(['js/vendor/modal', 'js/vendor/toast', 'js/vendor/cookie', 'js/vendor/validate', 'js/vendor/placeholder'], function(Modal, Toast, Cookie){
  // 点击退出
  $('.logout').click(function(){
    console.log('logout');
  });
  var contentHtml = __inline('../../template/modules/login.html');
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