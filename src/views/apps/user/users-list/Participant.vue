<template>
  <b-card-body>
    <div class="mt-4 mb-2 text-center">
      <h4>Les Joueurs</h4>
      <b-card-text>Les Joueurs inscrits dans cette evénement</b-card-text>
    </div>

    <!-- Swiper -->
    <swiper
      class="swiper-responsive-breakpoints px-4 py-2"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="(user,index) in userData"
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
            :to="{ name: 'apps-users-view', params: { id: user.id } }"
          >
            {{ user.name }}
          </b-link>
      
        </h6>
      
      </b-card-body>
      
      <div class="item-img text-center">
     
          <b-avatar
                      :src="userData.image"

                size="64"/>
      </div>

      <!-- Product Details -->
      <b-card-body>
      
        <h6 class="item-name">
         
          <b-card-text class="item-company">
            Club <b-link class="ml-25"
                        :to="{ name: 'apps-clubs-view', params: { id: user.Club.id } }">
              {{ user.Club.name }}
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
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useUsersList from './useUsersList'
import userStoreModule from '../userStoreModule'
import router from '@/router'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import authentication from '@/services/authentication.js'
export default {
  components: {
    BCardBody,
    BCardText,
    BImg,
    BLink,
    BAvatar,
      BCard, BButton,
   vSelect,
    // 3rd Party
    Swiper,
    SwiperSlide,
  },
     props: {
    userData: {
      type: Array,
      required: true,
    },
  
  },
    data() {
    return {
     userId:"",

    }
  },
  created(){
console.log(this.userData)
  },
    methods:{
    tirage(){
      this.$router.push({ name: 'apps-competitions-bracket', params: {players: this.userData}})

    },
      sendInfo(info){
     
       this.userId=info },
        eliminer() {
      
          authentication.eliminer ({
         compId: router.currentRoute.params.id ,
         userId:this.userId
     
        }) .then(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Elimination effectué avec succces',
            icon: 'AlertTriangleIcon',
            variant: 'success',
          },
        })
        this.$emit('refetch-data') 
    }).catch(error=>{console.log(error),
      this.$toast({
      component: ToastificationContent,
      props: {
        title: 'problem',
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })
      
    })},
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
    const USER_APP_STORE_MODULE_NAME = 'app-user'
    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
     
    const isAddNewUserSidebarActive = ref(false)
    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Maintainer', value: 'maintainer' },
      { label: 'Subscriber', value: 'subscriber' },
    ]
    const planOptions = [
      { label: 'Basic', value: 'basic' },
      { label: 'Company', value: 'company' },
      { label: 'Enterprise', value: 'enterprise' },
      { label: 'Team', value: 'team' },
    ]
    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]
    const {
      fetchUsersTest,
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    } = useUsersList()
  
    return {
      // Sidebar
      isAddNewUserSidebarActive,
      fetchUsersTest,
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      // Filter
      avatarText,
      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      roleOptions,
      planOptions,
      statusOptions,
      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
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
