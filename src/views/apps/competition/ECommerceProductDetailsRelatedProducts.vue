<template>
  <b-card-body>
    <div class="mt-4 mb-2 text-center">
      <h4>Related Products</h4>
      <b-card-text>People also search for this items</b-card-text>
    </div>

    <!-- Swiper -->
    <swiper
      class="swiper-responsive-breakpoints px-4 py-2"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="(product,index) in relatedProducts"
        :key="index"
      >
    <b-card
     
      class="ecommerce-card"
      no-body
    >
       <b-card-body>
      
        <h6 class="item-name">
          <b-link
            class="text-body"
            :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }"
          >
            {{ product.name }}
          </b-link>
      
        </h6>
      
      </b-card-body>
      
      <div class="item-img text-center">
     
          <b-avatar
         :src="product.image"

                size="64"/>
      </div>

      <!-- Product Details -->
      <b-card-body>
      
        <h6 class="item-name">
         
          <b-card-text class="item-company">
            Club <b-link class="ml-25">
              {{ product.brand }}
            </b-link>
          </b-card-text>
        </h6>
      
      </b-card-body>

    </b-card>
      </swiper-slide>

      <!-- Add Arrows -->
      <div
        slot="button-next"
        class="swiper-button-next"
      />
      <div
        slot="button-prev"
        class="swiper-button-prev"
      />
    </swiper>
  </b-card-body>
</template>

<script>
import {
  BCardBody, BCardText, BImg, BLink,  BCard, BButton,BAvatar

} from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    BCardBody,
    BCardText,
    BImg,
    BLink,
    BAvatar,
      BCard, BButton,

    // 3rd Party
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperOptions = {
      slidesPerView: 5,
      spaceBetween: 55,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1600: {
          slidesPerView: 4,
          spaceBetween: 55,
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 55,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 55,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 55,
        },
      },
    }

    /* eslint-disable global-require */
 
    /* eslint-disable global-require */

    return {
      swiperOptions,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/swiper.scss';
@import '~swiper/css/swiper.css';
@import "~@core/scss/base/pages/app-ecommerce.scss";

</style>
