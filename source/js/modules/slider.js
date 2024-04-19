export default () => {
    function Slider(options) {
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
        }

        privates.opt = {
            'position': 0,
            'max_position': privates.elements.slides.length,
            'currentTransform': 0,
            'isEnd': false,
        }

        console.log(privates.elements)

        if(privates.elements.total) {
            privates.elements.total.textContent = privates.opt.max_position
        }

        if(privates.elements.current) {
            privates.elements.current.textContent = privates.opt.position + 1
        }

        if(privates.elements.prev !== null) {
            privates.elements.prev.addEventListener('click', () => {
                this.prev_slide()
            })
        }

        if(privates.elements.next !== null) {
            privates.elements.next.addEventListener('click', () => {
                this.next_slide();
            })
        }

        this.move_slide = () => {
            privates.elements.slides.forEach((slide) => {
                slide.classList.remove('slider__slide--active')
            })

            privates.elements.slides[privates.opt.position].classList.add('slider__slide--active')
        }

        this.check_end = () => {
            let trueWidth = 0
            privates.elements.slides.forEach((slide) => {
                trueWidth += slide.offsetWidth
                console.log(slide.offsetWidth)
            })

            const movedWidth = privates.elements.wrap.offsetWidth + privates.opt.currentTransform

            // privates.opt.isEnd = movedWidth > trueWidth - privates.elements.slides[privates.opt.max_position - 1].offsetWidth
            privates.opt.isEnd = movedWidth > trueWidth
            
        }

        this.prev_slide = () => {
            if (privates.opt.position != 0) {
                --privates.opt.position
                privates.opt.currentTransform -= privates.elements.activeSlide.offsetWidth
                privates.elements.wrap.style.transform = `translateX(-${privates.opt.currentTransform}px)`

                if (window.innerWidth >= 1024 && privates.options.spaceBetween) {
                    privates.opt.currentTransform -= privates.options.spaceBetween
                }

                if(privates.elements.current) {
                    privates.elements.current.textContent = privates.opt.position + 1
                }

                this.move_slide()
                this.check_end()
            }
            
        }

        this.next_slide = () => {
            console.log('isEnd', privates.opt.isEnd)
            if (privates.opt.position < privates.opt.max_position - 1 && !privates.opt.isEnd) {
                ++privates.opt.position
                privates.opt.currentTransform += privates.elements.activeSlide.offsetWidth

                if (window.innerWidth >= 1024 && privates.options.spaceBetween) {
                    console.log(privates.options.spaceBetween)
                    privates.opt.currentTransform += privates.options.spaceBetween
                }

                privates.elements.wrap.style.transform = `translateX(-${privates.opt.currentTransform}px)`

                if(privates.elements.current) {
                    privates.elements.current.textContent = privates.opt.position + 1
                }

                
                this.move_slide()
                this.check_end()
                console.log('isEnd after move', privates.opt.isEnd)
            }
            
        }

        this.destroy = () => {
            privates.isOn = false
            privates.elements.wrap.style.transform = null
        }

        this.init = () => {
            privates.isOn = true
            privates.elements.activeSlide = privates.elements.slides[0]
            privates.elements.slides[0].classList.add('slider__slide--active')
        }

        if(privates.options.mobile_only) {
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024 && privates.isOn) {
                    this.destroy()
                } 

                if (window.innerWidth < 1024 && !privates.isOn) {
                    this.init()
                }
            })
        }

        this.init()
    }

    // const stagesSlider = new Slider({
    //     'main': '.js-slider',
    //     'mobile_only': true,
    // })

    const membersSlider = new Slider({
        'main': '.js-slider-members',
        'spaceBetween': 20,
    })
}
