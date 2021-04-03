// import 'tom-select';

const selectOptions = {}

new TomSelect("#calculator__colors", selectOptions);
new TomSelect("#calculator__size", selectOptions);
new TomSelect("#calculator__city", selectOptions);
new TomSelect("#calculator__delivery", selectOptions);

const datepicker = datepicker('#calculator__datepicker-input', {
    dateSelected: new Date(),
})

const calcNumber = document.querySelector('#calculator__count-input');
const calcNumberMinus = document.querySelector('#calculator__count-minus');
const calcNumberPlus = document.querySelector('#calculator__count-plus');
console.log(calcNumber);

calcNumberMinus.addEventListener('click', function() {
    console.log('minus click');
    calcNumber.stepDown(1)
})
calcNumberPlus.addEventListener('click', function() {
    console.log('plus click');
    calcNumber.stepUp(1)
})