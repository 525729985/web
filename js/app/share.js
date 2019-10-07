require(['js/vendor/toast.es6'], function(Toast){
	function removeDisable(el){
		$(el).closest('.btn-receive').removeClass('disabled');
	}
  var url = encodeURIComponent(location.href);
  var title = encodeURIComponent(document.title);
  $('.i-qzone').click(function(){
    var shareStr= 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&title=' + title + '&pics=' + $(this).data('pic')
    window.open(shareStr,'newwindow');
		removeDisable(this);
  });
  $('.i-weibo').click(function(){
    var shareStr= 'http://v.t.sina.com.cn/share/share.php?content=utf-8&url=' + url + '&sourceUrl=' + url + '&title=' + title + '&pic=' + $(this).data('pic');
    window.open(shareStr,'newwindow');
		removeDisable(this);
  });
	// 点击领取
	$(document).on('click', '.btn-receive:not(.disabled) .btn', function(){
		Toast({
			message: 'test',
		});
	});
});