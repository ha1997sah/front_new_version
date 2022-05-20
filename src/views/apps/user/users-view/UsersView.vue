<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="userData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <user-view-user-info-card :user-data="userData"  :user-club="userClub" :user-fed="userFed"  />
        </b-col>
        
      </b-row>
 <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <user-view-user-timeline-card :user-data="userData"/>
        </b-col>
         <b-col
          cols="12"
          lg="6"
        >
          <user-timeline :user-data="userRecord" />
        </b-col>
      
      </b-row>

    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import userStoreModule from '../userStoreModule'
import UserViewUserInfoCard from './UserViewUserInfoCard.vue'
import UserViewUserPlanCard from './UserViewUserPlanCard.vue'
import UsersEdit from '../users-edit/UsersEdit.vue'
import UserViewUserTimelineCard from './UserViewUserTimelineCard.vue'
import UserTimeline from './UserTimeline.vue'
import authentication from '@/services/authentication.js'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    UsersEdit,
    UserTimeline,
    UserViewUserTimelineCard,
    // Local Components
    UserViewUserInfoCard,
    UserViewUserPlanCard,
 

  },
  setup() {
    const userData = ref(null)
    const userRecord=ref(null)
    const userClub=ref(null)
    const userFed=ref(null)

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user/fetchUserById', { id: router.currentRoute.params.id })
      .then(response => { userData.value = response.data.user,console.log(userData.value),userClub.value=response.data.user.Club,console.log("club",userClub.value),userFed.value=response.data.user.Federation,console.log("fed",userFed.value) })

      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })

      authentication.getRecords({ UserId: router.currentRoute.params.id }).then(response =>{
        userRecord.value=response.data.records,
        console.log(userRecord.value)
      })

    return {
      userData,
      userRecord,
      userClub,
      userFed
    }
  },
}
</script>

<style>

</style>
