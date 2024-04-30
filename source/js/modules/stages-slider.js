import Swiper from 'swiper'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'

export default () => {
  Swiper.use([Navigation, Pagination, EffectFade])
  let stagesSlider
  let init = false

  function onWindowResizeChangeSlider() {
    if (window.innerWidth > 1280 && init) {
      init = false
      stagesSlider.destroy()
    }

    if (window.innerWidth < 1280 && !init) {
      init = true
      stagesSlider = new Swiper('.js-slider-stages', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: ".swiper-pagination",
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
      })
    }
  }

  onWindowResizeChangeSlider()
  window.addEventListener('resize', onWindowResizeChangeSlider)

}
