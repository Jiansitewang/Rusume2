!function () {
  var view = document.querySelector('#mySlides')
  var controller = {
    view: null,
    swiper: null,
    swiperOptions: {
      // Optional parameters
      // loop: true,
      // parallax: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    },
    init: function (view) {
      this.view = view
      this.initSwiper()
    },
    initSwiper: function () {
      this.swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions)
    }
  }
  controller.init(view)
}.call()
