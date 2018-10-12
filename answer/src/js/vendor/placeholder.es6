import { canPlaceholder } from './util/device';

const defaults = {
  namespace: 'my-placeholder'
}
function showPlaceholder(el){
  if($(el).val() === ""){
    $(el).val($(el).attr('placeholder')).addClass(defaults.namespace);
  }
}
function hidePlaceholder(el){
  if($(el).val() === $(el).attr('placeholder')){
    $(el).val('').removeClass(defaults.namespace);
  }
}
$.fn.fixPlaceholder = function() {
  if (canPlaceholder) {
    return;
  }
  $(this).each(function () {
    if($(this).hasClass(`${ defaults.namespace }-fixed`)){
      return;
    }
    showPlaceholder(this);
    $(this)
      .addClass(`${ defaults.namespace }-fixed`)
      .focus(function () {
        hidePlaceholder(this);
      }).blur(function () {
      showPlaceholder(this);
    });
    $(this)['val'] = function (value) {
      if (!value && $(this).hasClass(defaults.namespace)) {
        this.value = '';
      }
      return $.fn.val.call(this, value);
    }
  });
}
$('[placeholder]').fixPlaceholder();