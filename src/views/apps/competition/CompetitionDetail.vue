<template>
  <section class="app-ecommerce-details">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="blogDetail === undefined"
    >
      <h4 class="alert-heading">
        Error fetching product data
      </h4>
      <div class="alert-body">
        No item found with this item slug. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-e-commerce-shop'}"
        >
          Shop
        </b-link>
        for other items.
      </div>
    </b-alert>

    <!-- Content -->
    <b-card v-if="blogDetail"
      no-body
    >
      <b-card-body>
         <swiper
    class="swiper-parallax"
    :options="swiperOptions"
    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
  >
    <div
      slot="parallax-bg"
      class="parallax-bg"
      data-swiper-parallax="-23%"
    >
      <b-img
        class="img-fluid"
        :src="require('@/assets/images/banner/img.jpg')"
        alt="banner"
      />
    </div>

    <swiper-slide
      v-for="(data,index) in swiperData"
      :key="index"
    >
      <div
        class="title"
        data-swiper-parallax="-300"
      >
        {{ blogDetail.name }}
      </div>
      <div
        class="subtitle"
        data-swiper-parallax="-200"
      >
        {{ blogDetail.start }} | {{blogDetail.end}}
      </div>
      <div
        class="text"
        data-swiper-parallax="-100"
      >
        <b-card-text>
          {{ blogDetail.description }}
        </b-card-text>
      </div>
    </swiper-slide>

    <div
      slot="pagination"
      class="swiper-pagination"
    />
    <div
      slot="button-next"
      class="swiper-button-next"
    />
    <div
      slot="button-prev"
      class="swiper-button-prev"
    />
  </swiper>

       <b-row class="my-2" >
         <b-col
            cols="12"
            md="7"
          >
          <h4>{{ blogDetail.name }}</h4>
          </b-col>
              <b-col
              md="12"
              v-for="(cat) in blogDetail.Categories" :key="cat.id" >
            <!-- user commnets -->
        <table class="mt-2 mt-xl-0 w-100" >
            <tr>
            <th class="pb-50">
              <feather-icon
                icon="Edit3Icon"
                class="mr-75"
              />
              <span class="font-weight-bold">Titre</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{cat.nameCat}}
            </td>
          </tr>
           <tr>
            <th class="pb-50">
              <feather-icon
                icon="CalendarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Dates</span>
            </th>
            <td class="pb-50 text-capitalize">
                <b-media no-body>
             
              <b-media-body>
                <small>
                  <b-link class="text-body">           
                       {{ new Date(cat.start).getDate()+'-'+new Date(cat.start).getMonth()+'-'+new Date(cat.start).getFullYear()}}
                       </b-link>
                </small>
                <span class="text-muted ml-75 mr-50">|</span>
                <small class="text-muted">
                   <b-link class="text-body">           
                       {{ new Date(cat.end).getDate()+'-'+new Date(cat.end).getMonth()+'-'+new Date(cat.end).getFullYear()}}
                </b-link>
                </small>
              </b-media-body>
            </b-media>
            </td>
          </tr>
            <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Type</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{cat.type}}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UsersIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Sexe</span>
            </th>
            <td class="pb-50">
              {{ cat.sexe }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="UsersIcon"
                class="mr-75"
              />

              <span class="font-weight-bold">Poids</span>
            </th>
             <td class="pb-50 text-capitalize">
            <b-row v-for="(w,index) in cat.weight.split('/')" :key="index">
    <b-col>{{ w }}</b-col>
    
  </b-row>
              
            </td> 
          
          </tr>
             <tr>
            <th>
              <feather-icon
                icon="UsersIcon"
                class="mr-75"
              />

              <span class="font-weight-bold">Age</span>
            </th>
             <td class="pb-50 text-capitalize">
                       <b-row  v-for="(w,index) in cat.age.split('/')" :key="index">
    <b-col>{{ w }}</b-col>
    
  </b-row>
            
            </td> 
          </tr>
        </table>

       
                    <hr class="my-2">

                  </b-col>

           </b-row>

      </b-card-body>

      <!-- Static Content -->
  <e-commerce-product-details-item-features/>
      <!-- Static Content -->
      <!-- Slider: Related Products -->
<participant :user-data="participantList"/> 
        <b-row class="my-2">

 <b-col
            cols="12"
            md="7"
          >
            <div class="d-flex flex-column flex-sm-row pt-1">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0"
               :to="{ name: 'apps-competitions-division', params: { id: blogDetail.id } }"

              >
                <feather-icon
                  icon="UserIcon"
                  class="mr-50"
                />
                <span>Voir joueurs par division</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
   </b-card>
  </section>
</template>

<script>
import { useRouter } from '@core/utils/utils'
import store from '@/store'

import ECommerceProductDetailsItemFeatures from './ECommerceProductDetailsItemFeatures.vue'
import ECommerceProductDetailsRelatedProducts from './ECommerceProductDetailsRelatedProducts.vue'

import {
  BCard, BCardBody, BRow, BCol, BImg, BCardText, BLink, BButton, BDropdown, BDropdownItem, BAlert,BBadge,
BAvatar, BMedia,BMediaBody,BAvatarGroup
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import competitionStoreModule from './competitionStoreModule'

import participant from '../user/users-list/Participant.vue'
import authentication from '@/services/authentication.js'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BAvatarGroup,
    Swiper,
    BBadge,
    SwiperSlide,
    BCard,
    participant,
    BCardBody,
    BRow,
    BCol,
    BImg,
    BCardText,
    BLink,
    BButton,
    BDropdown,
    BDropdownItem,
    BAlert,
    BAvatar, BMedia,BMediaBody,
        ECommerceProductDetailsItemFeatures,
    ECommerceProductDetailsRelatedProducts,
  },
    data() {
    return {
      search_query: '',
      commentCheckmark: '',
      blogSidebar: {},
       search_query: '',
      blogList: [],
      blogSidebar: {},
      currentPage: 1,
      perPage: 1,
      rows: 140,
      img: require('@/assets/images/karate.jpg'),
      userData:null,
      latestComp:null,
      query:'',
      show:true,
      idComp:'',
      idCat:'',
      allowParticip:true,
      socialShareIcons: [
        'GithubIcon',
        'GitlabIcon',
        'FacebookIcon',
        'TwitterIcon',
        'LinkedinIcon',
      ],

        swiperData: [
        { title: 'Slide 1', subtitle: 'Subtitle', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet Lorem, ipsum dolor sit amet consectetur..' },
        { title: 'Slide 2', subtitle: 'Subtitle', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam reiciendis provident atque quod obcaecati voluptatibus ex qui repudiandae sunt dolores. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integeo. Aenean feugiat non eros quis feugiat.' },
        { title: 'Slide 3', subtitle: 'Subtitle', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam reiciendis provident atque quod obcaecati voluptatibus ex qui repudiandae sunt dolores. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lnt ut libero. Aenean feugiat non eros quis feugiat.' },
      ],
      swiperOptions: {
        speed: 600,
        parallax: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
    created() {
    this.$http.get('/blog/list/data/detail').then(res => { this.blogDetail = res.data })
    this.$http.get('/blog/list/data/sidebar').then(res => { this.blogSidebar = res.data })
      authentication.findUserById(JSON.parse(localStorage.getItem("userData")).id).then(response => { this.userData = response.data.user,
          console.log("userrr",this.userData)

          })
  },
     methods: {

          inscrit(){
 authentication.inscrit({
            compId:this.idComp,
            userId:JSON.parse(localStorage.getItem("userData")).id
          }).then(response=>{
               this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Participation Ok',
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: 'Votre demande d\'inscription a été bien enregistrer nous traitons votre demande dans le bref délais',
                    },
                  })

 })
    } ,
       elig(info,cat){
          this.idComp=info,
          this.idCat=cat,
          authentication.elig({
            compId:"2",
            idCat:this.idCat,
            userId:JSON.parse(localStorage.getItem("userData")).id
          }).then(response=>{
             if(response.status===201)
            {this.show=true}
           if(response.status===200) {
              this.show=false}
             console.log(this.show)

 })
    },
  
  
  },
    // SFC
  
 setup() {
    const blogDetail= ref(null)
    const image=ref(null)
    const latestComp=ref(null)

    const participantList=ref(null)
    const COMPETITION_APP_STORE_MODULE_NAME = 'app-competition'
    const date=ref(null)
    const end=ref(null)
    const categories=ref([])
 const p = [
      { name: 'Pending' },
      { name: 'Active' },
      { name: 'Inactive' },
    ]    // Register module
    if (!store.hasModule(COMPETITION_APP_STORE_MODULE_NAME)) store.registerModule(COMPETITION_APP_STORE_MODULE_NAME, competitionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(COMPETITION_APP_STORE_MODULE_NAME)) store.unregisterModule(COMPETITION_APP_STORE_MODULE_NAME)
    })
 
    store.dispatch('app-competition/fetchCompetitionById', { id: router.currentRoute.params.id })
      .then(response => { blogDetail.value = response.data.competition ,
           blogDetail.value.image=`http://localhost:3001/${response.data.competition.image}`,
            date.value = new Date(response.data.competition.start),
            end.value = new Date(response.data.competition.end),


           blogDetail.value.start= date.value.getDate()+'-'+date.value.getMonth()+'-'+date.value.getFullYear(),
           blogDetail.value.end= end.value.getDate()+'-'+end.value.getMonth()+'-'+end.value.getFullYear()})
      .catch(error => {
        if (error.response.status === 404) {
          blogDetail.value = undefined
        }
      }),

         authentication.participantList({ id: "2"}).then(response => {
      participantList.value= response.data.users,
      console.log("ppp",participantList.value)
    }),
    authentication.latestCompetitions().then(response =>{
      latestComp.value= response.data.competitions

    })

    return {
      blogDetail,
      image,
      participantList,
      p,
      latestComp,
      categories
    }}}
    </script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce-details.scss";

</style>
