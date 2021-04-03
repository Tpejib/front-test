"use strict";

// import 'tom-select';
var selectOptions = {};
new TomSelect("#calculator__colors", selectOptions);
new TomSelect("#calculator__size", selectOptions);
new TomSelect("#calculator__city", selectOptions);
new TomSelect("#calculator__delivery", selectOptions);
var datepicker = datepicker('#calculator__datepicker-input', {
  dateSelected: new Date()
});
var calcNumber = document.querySelector('#calculator__count-input');
var calcNumberMinus = document.querySelector('#calculator__count-minus');
var calcNumberPlus = document.querySelector('#calculator__count-plus');
console.log(calcNumber);
calcNumberMinus.addEventListener('click', function () {
  console.log('minus click');
  calcNumber.stepDown(1);
});
calcNumberPlus.addEventListener('click', function () {
  console.log('plus click');
  calcNumber.stepUp(1);
});