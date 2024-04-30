import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

export default () => {
  Swiper.use([Navigation, Pagination, Autoplay, EffectFade])
  const membersSlider = new Swiper('.js-slider-members', {
      loop: true,
      autoplay: {
        delay: 4000
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  })
}
