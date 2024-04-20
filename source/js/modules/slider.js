export default function Slider(options) {
    let privates = {}

    privates.options = options
    privates.isOn = false

    privates.main = document.querySelector(privates.options.main);

    privates.elements = {
        'wrap': privates.main.querySelector('.slider__wrap'),
        'slides': privates.main.querySelectorAll('.slider__slide'),
        'activeSlide': privates.main.querySelector('.slider__slide--active'),
        'prev': privates.main.querySelector('.slider__prev'),
        'next': privates.main.querySelector('.slider__next'),
        'current': privates.main.querySelector('.slider__current'),
        'total': privates.main.querySelector('.slider__total'),
        'pagination': privates.main.querySelector('.slider__pagination'),
        'pagination_items': []
    }

    privates.opt = {
        'position': 0,
        'max_position': privates.elements.slides.length,
        'currentTransform': 0,
        'isStart': true,
        'isEnd': false,
        'spaceBetween': 0,
        'mode': window.innerWidth > 1280 ? 'desktop' : 'mobile'
    }

    this.on_prev_click = (event) => {
        this.prev_slide()
    }

    this.on_next_click = (event) => {
        this.next_slide()
    }

    this.move_slide = () => {
        privates.elements.slides.forEach((slide) => {
            slide.classList.remove('slider__slide--active')
        })

        privates.elements.slides[privates.opt.position].classList.add('slider__slide--active')

        if (privates.elements.pagination) {
            privates.elements.pagination_items.forEach((item) => {
                item.classList.remove('slider__pagination-item--active')
            })

            privates.elements.pagination_items[privates.opt.position].classList.add('slider__pagination-item--active')
        }
    }

    this.check_start = () => {
        privates.opt.isStart = privates.opt.position === 0
        privates.opt.isStart ? privates.main.classList.add('slider--start') : privates.main.classList.remove('slider--start')
    }

    this.check_end = () => {
        let trueWidth = 0
        privates.elements.slides.forEach((slide) => {
            trueWidth += slide.offsetWidth
        })

        const movedWidth = privates.elements.wrap.offsetWidth + privates.opt.currentTransform

        privates.opt.isEnd = movedWidth >= trueWidth
        privates.opt.isEnd ? privates.main.classList.add('slider--end') : privates.main.classList.remove('slider--end')
    }

    this.make_pagination = () => {
        for (let i = 0; i < privates.opt.max_position; i++) {
            const item = document.createElement("div");
            item.classList.add('slider__pagination-item')
            privates.elements.pagination.appendChild(item);
        }

        privates.elements.pagination_items = privates.elements.pagination.querySelectorAll('.slider__pagination-item')
        privates.elements.pagination_items[0].classList.add('slider__pagination-item--active')
    }

    this.remove_pagination = () => {
        privates.elements.pagination_items = []
        privates.elements.pagination.innerHTML = ''
    }

    this.prev_slide = () => {
        if (privates.opt.position != 0) {
            --privates.opt.position

            privates.opt.currentTransform -= privates.elements.activeSlide.offsetWidth
            privates.elements.wrap.style.transform = `translateX(-${privates.opt.currentTransform}px)`
            
            this.getSpaceBetween()

            console.log('current spaceBetween', privates.opt.spaceBetween)
            privates.opt.currentTransform -= privates.opt.spaceBetween

            if(privates.elements.current) {
                privates.elements.current.textContent = privates.opt.position + 1
            }

            this.move_slide()
            this.check_end()
            this.check_start()
        }
        
    }

    this.next_slide = () => {
        console.log('isEnd', privates.opt.isEnd)

        if (privates.opt.position < privates.opt.max_position - 1 && !privates.opt.isEnd) {
            ++privates.opt.position
            privates.opt.currentTransform += privates.elements.activeSlide.offsetWidth

            this.getSpaceBetween()

            console.log('current spaceBetween', privates.opt.spaceBetween)
            privates.opt.currentTransform += privates.opt.spaceBetween

            privates.elements.wrap.style.transform = `translateX(-${privates.opt.currentTransform}px)`

            if(privates.elements.current) {
                privates.elements.current.textContent = privates.opt.position + 1
            }

            
            this.move_slide()
            this.check_end()
            this.check_start()
        }
        
    }

    this.destroy = () => {
        privates.isOn = false
        privates.elements.wrap.style.transform = null

        privates.main.classList.remove('slider--active')

        if(privates.elements.prev !== null) {
            privates.elements.prev.removeEventListener('click', this.on_prev_click)
        }

        if(privates.elements.next !== null) {
            privates.elements.next.removeEventListener('click', this.on_next_click)
        }
        if(privates.elements.pagination) {
            this.remove_pagination()
        }
        
    }

    this.init = () => {
        if ((privates.options.mobile_only && window.innerWidth < 1280) || !privates.options.mobile_only) {
            console.log('initializing')
            privates.isOn = true
            privates.opt.currentTransform = 0
            privates.opt.position = 0
            privates.elements.activeSlide = privates.elements.slides[0]
            privates.elements.slides[0].classList.add('slider__slide--active')
            this.check_start()
            this.check_end()
            privates.opt.mode = window.innerWidth >= 1280 ? 'desktop' : 'mobile'

            privates.main.classList.add('slider--active')

            if(privates.elements.total) {
                privates.elements.total.textContent = privates.opt.max_position
            }
    
            if(privates.elements.current) {
                privates.elements.current.textContent = privates.opt.position + 1
            }

            if(privates.elements.prev !== null) {
                privates.elements.prev.addEventListener('click', this.on_prev_click)
            }
    
            if(privates.elements.next !== null) {
                privates.elements.next.addEventListener('click', this.on_next_click)
            }

            if(privates.elements.pagination && privates.elements.pagination_items.length === 0) {
                this.make_pagination()
            }
        }
        
    }

    this.getSpaceBetween = () => {
        if (window.innerWidth < 1280 && privates.options.mobileSpaceBetween) {
            privates.opt.spaceBetween = privates.options.mobileSpaceBetween
        } else if (window.innerWidth >= 1280 && privates.options.spaceBetween) {
            privates.opt.spaceBetween = privates.options.spaceBetween
        } else {
            privates.opt.spaceBetween = 0
        }
    }

    if(privates.options.mobile_only) {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1280 && privates.isOn) {
                this.destroy()
            } 

            if (window.innerWidth < 1280 && !privates.isOn) {
                this.init()
            }
        })
    }

    window.addEventListener('resize', () => {

        if ((window.innerWidth >= 1280 && privates.opt.mode !== 'desktop') || (window.innerWidth < 1280 && privates.opt.mode !== 'mobile')) {
            this.destroy()
            this.init()
        }
    })

    this.init()
}
