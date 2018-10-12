
import { makeJqueryPlugin } from './util/plugin';
const defaults = {
  namespace: 'my-checkbox',
  onChange: null,
}
export default class Checkbox {
  constructor(el, options) {
    this.options = $.extend({}, defaults, options);
    this.$el = $(el);
    this.$slides = this.$el.find(this.options.selector);
    this.init();
    this.bindEvents();
  }
  init(){
    const { namespace } = this.options;
    this.type = this.$el.attr('type');
    this.$el.wrap(`<span class="${ namespace } ${ this.$el.attr('class')||'' } ${ this.$el.prop('checked')?'checked':'' }"></span>`).removeAttr('class').after(`<span class="${ namespace }-inner"></span>`);
    this.$warp = this.$el.parent();
  }
  bindEvents(){
    this.events = {
      change: (e)=>{
        if(this.type === 'radio'){
          $(`[name=${ this.$el.attr('name') }]`).parent(`.${this.options.namespace}.checked`).removeClass('checked');
        }
        const checked = this.$el.prop('checked');
        this.$warp[checked ? 'addClass':'removeClass']('checked');
        this.options.onChange && this.options.onChange.call(this.$el, checked);
      }
    }
    this.$el.on('change', this.events.change);
  }
}
makeJqueryPlugin('Checkbox', Checkbox);
$('[data-target=checkbox]').Checkbox();