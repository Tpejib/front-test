// import 'tom-select';



// Tom Select

const selectOptions = {}

new TomSelect("#calculator__colors", selectOptions)
new TomSelect("#calculator__size", selectOptions)
new TomSelect("#calculator__city", selectOptions)
new TomSelect("#calculator__delivery", selectOptions)
new TomSelect("#footer-contact__input", selectOptions)

// Datepicker

const datepicker = datepicker('#calculator__datepicker-input', {
    dateSelected: new Date(),
    position: 'tr'
})

// Calc Number

const calcNumber = document.querySelector('#calculator__count-input')
const calcNumberMinus = document.querySelector('#calculator__count-minus')
const calcNumberPlus = document.querySelector('#calculator__count-plus')

calcNumberMinus.addEventListener('click', function() {
    calcNumber.stepDown(1)
})
calcNumberPlus.addEventListener('click', function() {
    calcNumber.stepUp(1)
})

// Form Submit 

const calcForm = document.querySelector('#calculator-form')

calcForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let color = calcForm.querySelector('#calculator__colors').innerText;
    let size = calcForm.querySelector('#calculator__size').innerText;
    let count = calcForm.querySelector('#calculator__count-input').value;
    let date = calcForm.querySelector('#calculator__datepicker-input').value;
    let city = calcForm.querySelector('#calculator__city').innerText;
    let delivery = calcForm.querySelector('#calculator__delivery').innerText;

    console.group('Order Details');
        console.log(`Color: ${color}`);
        console.log(`Size: ${size}`);
        console.log(`Count: ${count}`);
        console.log(`Date: ${date}`);
        console.log(`City: ${city}`);
        console.log(`Delivery: ${delivery}`);
    console.groupEnd()
})


// Content Slider

const stepsItems = document.querySelectorAll('.steps-content__item')
const sectionSlide = document.querySelector('.section__slide-content')

const slideContent = function(slide) {
    let list = slide.querySelectorAll('.slide-content__list-item')
    let textList = slide.querySelectorAll('.slide-content__text')

    list.forEach(item => {
        item.addEventListener('click', function() {
            let listId = this.dataset.id
            list.forEach(item => item.classList.remove('active'))
            this.classList.add('active')
            textList.forEach(function(item) {
                let textId = item.dataset.id
                item.classList.remove('active')
                if (textId == listId) {
                    item.classList.add('active')
                }
            })
        })
    })
}

stepsItems.forEach(item => slideContent(item))
slideContent(sectionSlide)

// Steps Slider

const stepsRange = document.querySelector('.steps-range')
const stepsRangeItems = stepsRange.querySelectorAll('.steps-range__item')
const stepsContent = document.querySelectorAll('.steps-content')

stepsRangeItems.forEach(item => {
    item.addEventListener('click', function() {
        let currentId = this.dataset.id
        stepsRangeItems.forEach(item => {
            let itemId = item.dataset.id
            if (itemId <= currentId) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
            stepsContent.forEach(function(item) {
                let contentId = item.dataset.id
                item.classList.remove('active')
                if (contentId == currentId) {
                    item.classList.add('active')
                }
            })
        })
    })
})

// Reviews Slider

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
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      }
})

// FAQ Toggle 

const faqItems = document.querySelectorAll('.faq-item')

const faqToggle = function(faq) {
    const faqQ = faq.querySelector('.faq-item__q')
    const faqA = faq.querySelector('.faq-item__a')
    faqQ.addEventListener('click', function() {
        if (!faq.classList.contains('active')) {
            faq.classList.add('active')
            faqA.style.height = 'auto';

            let height = faqA.clientHeight + 'px';
            
            faqA.style.height = '0px';

            setTimeout(function () {
                faqA.style.height = height;
            }, 0);

        } else {
            faqA.style.height = '0px';

            faqA.addEventListener('transitionend', function () {
                faq.classList.remove('active');
            }, {
                once: true
            });
        }
    })
}

faqItems.forEach(item => {faqToggle(item)})