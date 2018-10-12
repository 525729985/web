
import PopupManager from './util/popup-manager';

const defaults = {
  namespace: 'my-toast',
  duration: 2000,
};
let id = null;
let timer = null;
function closeModal(){
  PopupManager.closeModal(id);
  id = null;
}
module.exports = function({ message, duration = defaults.duration, onClose }){
  if(id){
    closeModal(id);
    clearTimeout(timer);
  }
  id = PopupManager.openModal(message, defaults.namespace);
  timer = setTimeout(function(){
    closeModal(id);
  }, duration)
};