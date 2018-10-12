
let transitions = false;
const obj = document.createElement('div');
const props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
for (let i in props) {
  if ( obj.style[ props[i] ] !== undefined ) {
    const pfx = props[i].replace('Perspective','').toLowerCase();
    const prop =  "-" + pfx + "-transform";
    transitions = {
      pfx,
      prop,
    };
    break;
  }
}
export default  transitions;