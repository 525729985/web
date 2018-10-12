
import PopupManager from './util/popup-manager';

const defaults = {
  namespace: 'my-modal',
  skin: '',
  shade: true,
  shadeClose: true,
  closeBtn: true,
  beforeShow: null,
  btns: [
    {
      txt: '确定'
    }
  ]
};
export function confirm(options){
  options = $.extend({}, defaults, options);
  let { namespace, title, content = '', href, btns, ...otherProp } = options;
  if(href){
    content = `<iframe scrolling="auto" allowtransparency="true" onload="this.className=''" class="${namespace}-load" src="${href}" frameborder="0"></iframe>`;
  }
  const html = [];
  if(title){
    html.push(`<div class="${ namespace }-title">${ title }</div>`);
  }
  html.push(`<div class="${ namespace }-content">${ content }</div>`);
  if(btns && btns.length > 0){
    html.push(`<div class="${ namespace }-btns">`);
    $.each(btns, function(index, btn){
      html.push(`<button id="${ namespace }-btns-${index}" class="${ btn.cls|| 'btn' }">${ btn.txt }</button>`);
    });
    html.push(`</div>`);
  }
  const id = PopupManager.openModal(html.join(''), options.namespace + ' ' + options.skin, otherProp);
  if(btns && btns.length > 0){
    $.each(btns, function(index, btn){
      if(btn.onClick){
        $(`#${ namespace }-btns-${index}`, '#my-popup-'+id).click(()=>{
          btn.onClick.call($('#my-popup-'+id));
        });
      }
    });
  }
  return id;
}
export function close(id, animation){
  PopupManager.closeModal(id, animation);
}