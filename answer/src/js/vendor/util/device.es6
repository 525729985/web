
const agent = navigator.userAgent.toLowerCase();
const ie =  (!!window.ActiveXObject || "ActiveXObject" in window) ? (
  (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
) : false;
export const canPlaceholder = 'placeholder' in document.createElement('input');
export default {
  ie,
}
