const distancePoints = (x1, y1, x2, y2) => Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
// точка начала работы эфекта

const getMousePos = (e) => {
  var posx = 0, posy = 0;
  if (e.pageX || e.pageY) 	{
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) 	{
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x : posx, y : posy }
};

class Nearby {
  constructor(el, options) {
    this.DOM = {el: el};
    this.options = options;
    this.init();
  }
  init() {
    this.mousemoveFn = (ev) => requestAnimationFrame(() => {
      const mousepos = getMousePos(ev); //координаты мыши
      const docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop};
      const elRect = this.DOM.el.getBoundingClientRect(); //обьект координат кнопки
      const elCoords = {
        x1: elRect.left + docScrolls.left, x2: elRect.width + elRect.left + docScrolls.left,
        y1: elRect.top + docScrolls.top, y2: elRect.height + elRect.top + docScrolls.top
      };// координаты кнопки
      const closestPoint = {x: mousepos.x, y: mousepos.y}; // координаты для прозрачности?

      console.log("mouse ", mousepos);
      console.log("el ", elCoords);
      console.log('point ', closestPoint);


      if ( mousepos.x < elCoords.x1 ) {
        closestPoint.x = elCoords.x1;
      //  console.log("left")
      }
      else if ( mousepos.x > elCoords.x2 ) {
        closestPoint.x = elCoords.x2;
       // console.log("right")

      }
      if ( mousepos.y < elCoords.y1 ) {
        closestPoint.y = elCoords.y1;
       // console.log("top")
      }
      else if ( mousepos.y > elCoords.y2 ) {
        closestPoint.y = elCoords.y2;
      //  console.log("bottom")
      }
      if ( this.options.onProgress ) {
        this.options.onProgress(distancePoints(mousepos.x, mousepos.y, closestPoint.x, closestPoint.y))
      }
    });

    window.addEventListener('mousemove', this.mousemoveFn);
  }
}

window.Nearby = Nearby;
