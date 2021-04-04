"use strict";

// import 'tom-select';
// Tom Select
var selectOptions = {};
new TomSelect("#calculator__colors", selectOptions);
new TomSelect("#calculator__size", selectOptions);
new TomSelect("#calculator__city", selectOptions);
new TomSelect("#calculator__delivery", selectOptions); // Datepicker

var datepicker = datepicker('#calculator__datepicker-input', {
  dateSelected: new Date(),
  position: 'tr'
}); // Calc Number

var calcNumber = document.querySelector('#calculator__count-input');
var calcNumberMinus = document.querySelector('#calculator__count-minus');
var calcNumberPlus = document.querySelector('#calculator__count-plus');
calcNumberMinus.addEventListener('click', function () {
  calcNumber.stepDown(1);
});
calcNumberPlus.addEventListener('click', function () {
  calcNumber.stepUp(1);
}); // Content Slider

var stepsItems = document.querySelectorAll('.steps-content__item');

var slideContent = function slideContent(slide) {
  var list = slide.querySelectorAll('.slide-content__list-item');
  var textList = slide.querySelectorAll('.slide-content__text');
  list.forEach(function (item) {
    item.addEventListener('click', function () {
      var listId = this.dataset.id;
      list.forEach(function (item) {
        return item.classList.remove('active');
      });
      this.classList.add('active');
      textList.forEach(function (item) {
        var textId = item.dataset.id;
        item.classList.remove('active');

        if (textId == listId) {
          item.classList.add('active');
        }
      });
    });
  });
};

stepsItems.forEach(function (item) {
  return slideContent(item);
}); // Steps Slider

var stepsRange = document.querySelector('.steps-range');
var stepsRangeItems = stepsRange.querySelectorAll('.steps-range__item');
var stepsContent = document.querySelectorAll('.steps-content');
stepsRangeItems.forEach(function (item) {
  item.addEventListener('click', function () {
    var currentId = this.dataset.id;
    stepsRangeItems.forEach(function (item) {
      var itemId = item.dataset.id;

      if (itemId <= currentId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }

      stepsContent.forEach(function (item) {
        var contentId = item.dataset.id;
        item.classList.remove('active');

        if (contentId == currentId) {
          item.classList.add('active');
        }
      });
    });
  });
}); // Reviews Slider

new Swiper('.reviews-slider', {
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  centeredSlidesBounds: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    576: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    }
  }
});