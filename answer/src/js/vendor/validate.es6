import { canPlaceholder } from './util/device';
const methods = {
  /**
   * 判断规则依赖是否存在
   */
  depend(param) {
    switch(typeof param) {
      case 'boolean':
        param = param;
        break
      case 'string':
        param = !!param.length;
        break
      case 'function':
        param = param();
      default:
        param = !0;
    }
    return param;
  },
  /**
   * 判断输入值是否为空
   */
  optional(value) {
    return !methods.required(value) && 'dependency-mismatch'
  },
  /**
   * 验证必填元素
   */
  required(value, param) {
    if (!methods.depend(param)) {
      return 'dependency-mismatch'
    } else if (typeof value === 'boolean') {
      return !0
    }
    return $.trim(value).length > 0;
  },
  /**
   * 验证电子邮箱格式
   */
  email(value) {
    return methods.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
  },
  /**
   * 验证手机格式
   */
  tel(value) {
    return methods.optional(value) || /^1[34578]\d{9}$/.test(value)
  },
  /**
   * 验证URL格式
   */
  url(value) {
    return methods.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
  },
  /**
   * 验证日期格式
   */
  date(value) {
    return methods.optional(value) || !/Invalid|NaN/.test(new Date(value).toString())
  },
  /**
   * 验证ISO类型的日期格式
   */
  dateISO(value) {
    return methods.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
  },
  /**
   * 验证十进制数字
   */
  number(value) {
    return methods.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
  },
  /**
   * 验证整数
   */
  digits(value) {
    return methods.optional(value) || /^\d+$/.test(value)
  },
  /**
   * 验证身份证号码
   */
  idcard(value) {
    return methods.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
  },
  /**
   * 验证两个输入框的内容是否相同
   */
  equalTo(value, param) {
    return methods.optional(value) || value === $(param).val()
  },
  /**
   * 验证是否包含某个值
   */
  contains(value, param) {
    return methods.optional(value) || value.indexOf(param) >= 0
  },
  /**
   * 验证最小长度
   */
  minlength(value, param) {
    return methods.optional(value) || value.length >= param
  },
  /**
   * 验证最大长度
   */
  maxlength(value, param) {
    return methods.optional(value) || value.length <= param
  },
  /**
   * 验证一个长度范围[min, max]
   */
  rangelength(value, param) {
    return methods.optional(value) || (value.length >= param[0] && value.length <= param[1])
  },
  /**
   * 验证最小值
   */
  min(value, param) {
    return methods.optional(value) || value >= param
  },
  /**
   * 验证最大值
   */
  max(value, param) {
    return methods.optional(value) || value <= param
  },
  /**
   * 验证一个值范围[min, max]
   */
  range(value, param) {
    return methods.optional(value) || (value >= param[0] && value <= param[1])
  },
}
const defaultMessages = {
  required: '这是必填字段',
  email: '请输入有效的电子邮件地址',
  tel: '请输入11位的手机号码',
  url: '请输入有效的网址',
  date: '请输入有效的日期',
  dateISO: '请输入有效的日期（ISO），例如：2009-06-23，1998/01/22',
  number: '请输入有效的数字',
  digits: '只能输入数字',
  idcard: '请输入18位的有效身份证',
  equalTo: '输入值必须和 {0} 相同',
  contains: '输入值必须包含 {0}',
  minlength: '最少要输入 {0} 个字符',
  maxlength: '最多可以输入 {0} 个字符',
  rangelength: '请输入长度在 {0} 到 {1} 之间的字符',
  min: '请输入不小于 {0} 的数值',
  max: '请输入不大于 {0} 的数值',
  range: '请输入范围在 {0} 到 {1} 之间的数值',
}
const util = {
  format(source, params) {
    if (arguments.length === 1) {
      return function() {
        var args = $.makeArray( arguments );
        args.unshift( source );
        return util.format.apply( this, args );
      };
    }
    if (params === undefined) {
      return source;
    }
    if (arguments.length > 2 && params.constructor !== Array){
      params = $.makeArray( arguments ).slice(1);
    }
    if (params.constructor !== Array){
      params = [params];
    }
    $.each(params, function(i, n) {
      source = source.replace(new RegExp( "\\{" + i + "\\}", "g" ), function(){
        return n;
      });
    });
    return source;
  },
  getCustomMessage(param, rule, customMessage) {
    const params = customMessage[param]
    const isObject = typeof params === 'object'
    if (params && isObject) return params[rule.method]
  },
}
function ValidateForm({ rules, messages = {}, allErrors = false, reCheck = true }){
  const form = this[0];
  if(!this.is('form')){
    console.warn(`Validate: el need a form.`);
    return;
  }
  const errors = [];
  for(let param in rules) {
    const element = form[param];
    if(!element){
      console.warn(`Validate: ${param} is no found.`);
      continue;
    }
		const elementRules = rules[param];
    const value = $(element).val();
    for(let method in elementRules) {
      const rule = { method, parameters:elementRules[method] };
      const result = methods[method](value, rule.parameters);
      if (result === true || result === 'dependency-mismatch') {
        continue;
      }
      if(reCheck){
        $(element).addClass('has-error');
        function reCheckFn(){
          const result = methods[method]($(this).val(), rule.parameters);
          if (result === true || result === 'dependency-mismatch') {
            $(element).removeClass('has-error');
            $(element).off('blur', reCheckFn)
          }
        }
        $(element).on('blur', reCheckFn);
      }
			errors.push({
        param,
        value,
				element,
        message: util.format(util.getCustomMessage(param, rule, messages) || defaultMessages[rule.method], rule.parameters) ||`Validate: No message defined for ${rule.method}.`
      });
			if(!allErrors){
				return errors[0];
			}
    }
  }
  return errors.length === 0 ? null : errors;
}

class Validator {
  static methods = methods;
  static messages = defaultMessages;
}
$.fn.ValidateForm = ValidateForm;
export {
  Validator
};