import device from './device';

let namespace = 'my-popup';
const instances = {};
const PopupManager = {
  _id: 1,
  zIndex: 2000,
  modalFade: device.ie < 10,
  modalStack: [],
  getInstance(id) {
    return instances[id];
  },
  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextId() {
    return PopupManager._id++;
  },
  nextZIndex() {
    return PopupManager.zIndex++;
  },
  createModal(id, modalClass, options) {
    const $model = $(`<div class="${namespace} ${modalClass}" id="${namespace}-${ id }"></div>`);
    if(options.closeBtn){
      const $close = $(`<div class="${namespace}-close"></div>`);
      $close.click(function(){
        PopupManager.closeModal(id);
      });
      $model.append($close);
    }
    return $model;
  },
  openModal(dom, modalClass = '', options = {}) {
    const id = PopupManager.nextId();
    const zIndex = PopupManager.nextZIndex();
    const $modalDom = PopupManager.createModal(id, modalClass, options);
    options.animation = options.animation !== false && !device.ie && device.ie < 10;
    if(options.animation){
      $modalDom.addClass(namespace + '-enter');
      setTimeout(() => {
        $modalDom.removeClass(namespace + '-enter');
      }, 400);
    }
    $modalDom.append(dom);
    if($.fn.fixPlaceholder){
      $modalDom.find('[placeholder]').fixPlaceholder();
    }
    options.beforeShow && options.beforeShow.call($modalDom, id);
    $modalDom.appendTo('body').css({
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex,
      marginLeft(){
        return -$(this).outerWidth()/2;
      },
      marginTop(){
        return -$(this).outerHeight()/2;
      }
    });
    if(options.shade){
      const $shadeDom = $(`<div id="${namespace}-shade-${ id }" class="${namespace}-shade" style="z-index:${ zIndex - 1 };"></div>`);
      $('body').append($shadeDom);
      if(options.shadeClose){
        $shadeDom.click(function(){
          PopupManager.closeModal(id);
        });
      }
    }
    PopupManager.register(id, options);
    return id;
  },
  closeModal(id, animation) {
    const $modalDom = $(`#${namespace}-${ id }`);
    const options = PopupManager.getInstance(id);
		if(!options){
			return;
		}
    if(options.onClose){
      const result = options.onClose.call($modalDom, id);
      if(result === false)
        return;
    }
    PopupManager.deregister(id);
    if (animation !== false || (animation === undefined && options.animation)) {
      $modalDom.addClass(namespace + '-leave');
      setTimeout(() => {
        $(`#${namespace}-shade-${ id }`).remove();
        $modalDom.remove();
      }, 200);
    }else{
      $(`#${namespace}-shade-${ id }`).remove();
      $modalDom.remove();
    }

  }
};
export default PopupManager;