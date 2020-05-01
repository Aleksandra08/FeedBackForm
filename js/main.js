const lineEq = (y2, y1, x2, x1, currentVal) => {

  var m = (y2 - y1) / (x2 - x1);
  var b = y1 - m * x1;
  return m * currentVal + b;
}; //?

const form = document.querySelector('.form');
const submitBtn = form.querySelector('.form__button');
const requiredElems = Array.from(form.querySelectorAll('input[required]'));

const distanceTheShould = {min: 0, max: 50};
const opacityInterval = {from: 0, to: 1};

new Nearby(submitBtn, {
  onProgress: (distance) => {
    const o = lineEq(opacityInterval.from, opacityInterval.to, distanceTheShould.max, distanceTheShould.min, distance);

    requiredElems.forEach((el) => {
      if ( !el.value ) {
        inputErrorEl = el.nextElementSibling; // получаем div Error
        TweenMax.to(inputErrorEl, 1, {
          opacity: Math.max(o,opacityInterval.from)
        });
      }
    });
  }
});