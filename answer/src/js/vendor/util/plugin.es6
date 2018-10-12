
export function makeJqueryPlugin (key, Component){
  $.fn[key] = function(options = {}){
    if (typeof options === 'string') {
      let component = $(this).data(key);
      if(component && component[options]){
        component[options].apply(component, Array.prototype.slice.call(arguments, 1));
      }else{
        console.log(`method ${options} not found.`);
      }
    }else if (typeof options == "object"){
      return this.each(function() {
        let component = $(this).data(key);
        if (!component) {
          const opt = $.extend({}, $(this).data(), options);
          component = new Component(this, opt);
          $(this).data(key, component);
        }else if(component.reset){
          component.options = $.extend({}, component.options, options);
          component.reset();
        }
      });
    }
  }
}