/*<debug>*/
import invariant from './util/invariant';
/*</debug>*/

export default class Scrollable{
  constructor(){
  }
  _init({ isVertical = true, isHorizontal = false, threshold = 0 } = {}){
    /*<debug>*/
    invariant(this.$container, 'Scrollable: need $container.');
    invariant(this.$el, 'Scrollable: need $el.');
    invariant(this.appear, 'Scrollable: need appear function.');
    /*</debug>*/
    this._isVertical = isVertical;
    this._isHorizontal = isHorizontal;
    this._threshold = threshold;
    this._bindEvents();
  }
  _bindEvents(){
    this._events = {
      check: ()=>{
        if((this._isVertical && this._checkVertical()) || (this._isHorizontal && this._checkVertical())){
          // from children
          this.appear();
          this._removeEvents();
        }
      }
    }
    $(this._events.check);
    $(window).on('resize', this._events.check);
    this.$container.on('scroll', this._events.check);
  }
  _removeEvents() {
    $(window).off('resize', this._events.check);
    this.$container.off('scroll', this._events.check)
  }
  _checkVertical(){
    let fold = this.$container.height() + (this.$container[0] === window ? this.$container.scrollTop() : this.$container.offset().top);
    return fold > this.$el.offset().top - this._threshold;
  }
  _checkHorizontal(){
    let fold = this.$container.width() + (this.$container[0] === window ? this.$container.scrollLeft() : this.$container.offset().left);
    return fold > this.$el.offset().left - this._threshold;
  }
}