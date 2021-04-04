// import 'tom-select';



// Tom Select

const selectOptions = {}

new TomSelect("#calculator__colors", selectOptions)
new TomSelect("#calculator__size", selectOptions)
new TomSelect("#calculator__city", selectOptions)
new TomSelect("#calculator__delivery", selectOptions)

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


// Content Slider

const stepsItems = document.querySelectorAll('.steps-content__item')

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
});