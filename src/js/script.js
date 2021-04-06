import TomSelect from 'tom-select/dist/js/tom-select.base'
import datepicker from 'js-datepicker'
import Swiper from 'swiper'
import SwiperCore, {Pagination} from 'swiper/core'

document.addEventListener("DOMContentLoaded", () => {

    // Tom Select
    
    const selectOptions = {}
    
    new TomSelect("#calculator__colors", selectOptions)
    new TomSelect("#calculator__size", selectOptions)
    new TomSelect("#calculator__city", selectOptions)
    new TomSelect("#calculator__delivery", selectOptions)
    new TomSelect("#footer-contact__input", selectOptions)
    
    // Datepicker
    
    const datePicker = datepicker('#calculator__datepicker-input', {
        dateSelected: new Date(),
        position: 'tr'
    })
    
    // Calc Number
    
    const calcCount = document.querySelector('#calculator__count')
    const calcCountInput = document.querySelector('#calculator__count-input')
    
    calcCount.addEventListener('click', e => {
        switch (e.target.id) {
            case 'calculator__count-minus':
                calcCountInput.stepDown(1)
                break;
            case 'calculator__count-plus':
                calcCountInput.stepUp(1)
                break;
        }
    })
    
    // Form Submit 
    
    const calcForm = document.querySelector('#calculator-form')
    
    calcForm.addEventListener('submit', e => {
        e.preventDefault();
        let color = calcForm.querySelector('#calculator__colors').innerText
        let size = calcForm.querySelector('#calculator__size').innerText
        let count = calcForm.querySelector('#calculator__count-input').value
        let date = calcForm.querySelector('#calculator__datepicker-input').value
        let city = calcForm.querySelector('#calculator__city').innerText
        let delivery = calcForm.querySelector('#calculator__delivery').innerText
    
        console.group('Order Details');
            console.log(`Color: ${color}`)
            console.log(`Size: ${size}`)
            console.log(`Count: ${count}`)
            console.log(`Date: ${date}`)
            console.log(`City: ${city}`)
            console.log(`Delivery: ${delivery}`)
        console.groupEnd()
    })
    
    // Steps Sliders
    
    const stepsRange = document.querySelector('.steps-range')
    const stepsRangeItems = stepsRange.querySelectorAll('.steps-range__item')
    const stepsContent = document.querySelectorAll('.steps-content')

    stepsRange.addEventListener('click', e => {
        if (e.target.classList.contains('steps-range__item')) {
            let item = e.target
            let currentId = item.dataset.id
            stepsRangeItems.forEach(item => {
                let itemId = item.dataset.id
                if (itemId <= currentId) {
                    item.classList.add('active')
                } else {
                    item.classList.remove('active')
                }
            })
            stepsContent.forEach(item => {
                let contentId = item.dataset.id
                item.classList.remove('active')
                if (contentId == currentId) {
                    item.classList.add('active')
                }
            })
        }
    })

    // Content Slider
    
    const stepsItems = document.querySelectorAll('.steps-content__item')
    const sectionSlide = document.querySelector('.section__slide-content')
    
    function slideContent(slide) {
        let list = slide.querySelectorAll('.slide-content__list-item')
        let textList = slide.querySelectorAll('.slide-content__text')

        slide.addEventListener('click', e => {
            if (e.target.classList.contains('slide-content__list-item')) {
                let item = e.target
                let itemId = item.dataset.id
                list.forEach(item => item.classList.remove('active'))
                item.classList.add('active')
                textList.forEach(item => {
                    let textId = item.dataset.id
                    item.classList.remove('active')
                    if (textId == itemId) {
                        item.classList.add('active')
                    }
                })
            }
        })
    }
    
    stepsItems.forEach(item => slideContent(item))
    slideContent(sectionSlide)

    // Reviews Slider

    SwiperCore.use([Pagination]);
    
    new Swiper('.reviews-slider', {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
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

    faqItems.forEach(item => {faqToggle(item)})
    
    function faqToggle(faq) {
        const faqQ = faq.querySelector('.faq-item__q')
        const faqA = faq.querySelector('.faq-item__a')
        faqQ.addEventListener('click', () => {
            if (!faq.classList.contains('active')) {
                faq.classList.add('active')
                faqA.style.height = 'auto'
    
                let height = faqA.clientHeight + 'px'
                
                faqA.style.height = '0px'
    
                setTimeout(() => {
                    faqA.style.height = height;
                }, 0);
    
            } else {
                faqA.style.height = '0px'
    
                faqA.addEventListener('transitionend', () => {
                    faq.classList.remove('active')
                }, {
                    once: true
                });
            }
        })
    }
    
    // Stars Rating
    
    const stars = document.querySelectorAll('.reviews-item__stars')
    
    stars.forEach(item => insertStars(item, 5))
    
    function insertStars(item, max = 5) {
        let starsNumber = Number(item.dataset.stars)
        let starsInt = Math.trunc(starsNumber)
        let starsRem = starsNumber % 1
        let innerStars = ''
    
        if (starsNumber < max) {
            item.insertAdjacentHTML('beforebegin', `<span>${starsNumber}</span>`)
            
            for (let i = 0; i < starsInt;  i++) {
                innerStars += '<div class="reviews-item__star"></div>'
            }
            if (starsRem) {
                let widthCalc = Number((Math.asin( 2 * starsRem - 1 ) / Math.PI + 0.5).toFixed(2))
                innerStars += `<div class="reviews-item__star reviews-item__star-wrapp"><div class="reviews-item__star reviews-item__star_rem" style="width: calc(23px * ${widthCalc})"></div></div>`
            }
        
            if (Math.ceil(starsNumber) < max) {
                let diff = max - starsNumber
                if (starsRem) {
                    diff -= 1
                }
        
                for (let i = 0; i < diff; i++) {
                    innerStars += '<div class="reviews-item__star reviews-item__star_empty"></div>'
                }
            }
        } else {
            item.insertAdjacentHTML('beforebegin', `<span>${max}</span>`)
            for (let i = 0; i < max;  i++) {
                innerStars += '<div class="reviews-item__star"></div>'
            }
        }
    
        item.innerHTML = innerStars
    }

    // Modal 

    const modalWrapp = document.querySelector('.modal-wrapp')
    const modalActivate = document.querySelector('#modal-activate')

    modalActivate.addEventListener('click', () => {
        modalWrapp.classList.add('active')
    })

    modalWrapp.addEventListener('click', e => {
        if ((e.target === e.currentTarget) || e.target.classList.contains('modal-close')) {
            e.currentTarget.classList.remove('active')
        }
    })

})
