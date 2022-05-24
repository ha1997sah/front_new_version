<template>
  <div>
    <!-- search input -->
    <section id="kb-category-search">
      <b-card
        no-body
        class="knowledge-base-bg text-center"
        :style="{backgroundImage: `url(${require('@/assets/images/bannerimg.jpg')})`}"
      >
        <b-card-body class="card-body">
          <h2 class="text-primary">
            {{blogDetail.name}}
          </h2>
          <b-card-text class="mb-2">
            <span>Biennvenue de la page de l'événement: </span>
            <span class="font-weight-bolder">{{blogDetail.name}}</span>
          </b-card-text>

          <!-- form -->
          <b-form class="kb-search-input">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="searchbar"
                placeholder="Tapez ici ..."
              />
            </b-input-group>
          </b-form>
          <!-- form -->
        </b-card-body>
      </b-card>
    </section>
    <!--/ search input -->

    <div id="knowledge-base-category">
      <b-row class="match-height">
        <b-col
          v-for="(cat) in blogDetail.Categories"
          :key="cat.id"
          md="6"
          sm="6"
        >
          <b-card>
             <b-row>
                <b-col md="6">
            <h6 class="kb-title">
              <feather-icon
                icon="UserIcon"
                size="20"
                class="mr-50"
              />{{ cat.nameCat }} 
            </h6>
             </b-col>

               <b-col md="6">
                 <b-button
              style="float:right"

      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      class="btn-icon rounded-circle"
       @click="$router.push( { path: `/apps/competitions/players/${cat.id}`})"
    >
      <feather-icon icon="UserIcon" />
    </b-button>
                 </b-col>
               </b-row>
             <b-row>
               <b-col md="4"> 
                  <feather-icon
                icon="Edit3Icon"
                class="mr-75"
              />
              <span class="font-weight-bold">Titre</span></b-col>
               <b-col md="8">{{cat.nameCat}}</b-col>
            </b-row>
             <b-row>
               <b-col md="4"> <feather-icon
                icon="ClockIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Dates</span></b-col>
               <b-col md="8"> <b-media no-body>
             
              <b-media-body>
                <small>
                  <b-link class="text-body">           
                       {{ new Date(cat.Event_Category.categoryDate).getDate()+'-'+new Date(cat.Event_Category.categoryDate).getMonth()+'-'+new Date(cat.Event_Category.categoryDate).getFullYear()}}
                       </b-link>
                </small>
               
              </b-media-body>
            </b-media></b-col>
            </b-row>
             <b-row>
               <b-col md="4"> <feather-icon
                icon="SquareIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Poids</span></b-col>
               <b-col md="8">    
                  <b-row v-for="(w,index) in cat.weight.split('/')" :key="index">
    <b-col>{{ w }}</b-col>
    
  </b-row></b-col>
            </b-row>
             <b-row>
               <b-col md="4"> <feather-icon
                icon="TriangleIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Age</span></b-col>
               <b-col md="8">                <b-row  v-for="(w,index) in cat.age.split('/')" :key="index">
    <b-col>{{ w }}</b-col>
    
  </b-row>
  </b-col>
            </b-row>
            
               <b-row>
               <b-col md="4"> <feather-icon
                icon="UsersIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Sexe</span></b-col>
               <b-col md="8">{{cat.sexe}}</b-col>
            </b-row>
             <b-row>
               <b-col md="4"> <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Type</span></b-col>
               <b-col md="8">{{cat.type}}</b-col>
            </b-row>

       
          </b-card>
        </b-col>

        <!-- no result found -->
     <!--    <b-col
          v-show="!filteredKB.length"
          cols="12"
          class="text-center"
        >
          <h4 class="mt-4">
            Search result not found!!
          </h4>
        </b-col> -->
        <!--/ no result found -->
      </b-row>
    </div>
  </div>
</template>

<script>
import { useRouter } from '@core/utils/utils'

import store from '@/store'

import ECommerceProductDetailsItemFeatures from './ECommerceProductDetailsItemFeatures.vue'
import ECommerceProductDetailsRelatedProducts from './ECommerceProductDetailsRelatedProducts.vue'

import {   BListGroup, BListGroupItem, BForm, BInputGroup, BInputGroupPrepend, BFormInput,

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
    BListGroup, BListGroupItem, BForm, BInputGroup, BInputGroupPrepend, BFormInput,
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
      show:b-rowue,
      idComp:'',
      idCat:'',
      allowParticip:b-rowue,
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
        parallax: b-rowue,
        pagination: {
          el: '.swiper-pagination',
          clickable: b-rowue,
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
                      text: 'Vob-rowe demande d\'inscription a été bien enregisb-rower nous b-rowaitons vob-rowe demande dans le bref délais',
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
            {this.show=b-rowue}
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
      console.log(blogDetail.value),
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
@import '@core/scss/vue/pages/page-knowledge-base.scss';

</style>
