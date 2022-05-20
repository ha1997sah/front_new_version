<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="clubData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-clubs-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="clubData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <club-view-info-card :club-data="clubData" />
        </b-col>
      </b-row>
      <b-row>
            <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
        <users-list />
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
import clubStoreModule from './clubStoreModule'
import ClubViewInfoCard from './ClubViewInfoCard.vue'
import ClubViewPlanCard from './ClubViewPlanCard.vue'
import ClubsEdit from './ClubsEdit.vue'
import UsersList from './UsersList.vue'

export default {
  components: {
    UsersList,
    BRow,
    BCol,
    BAlert,
    BLink,
 
    // Local Componentss
    ClubViewInfoCard,
    ClubViewPlanCard,
    ClubsEdit,
  },
  setup() {
    const clubData = ref(null)

    const CLUB_APP_STORE_MODULE_NAME = 'app-club'

    // Register module
    if (!store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.registerModule(CLUB_APP_STORE_MODULE_NAME, clubStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.unregisterModule(CLUB_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-club/fetchClubById', { id: router.currentRoute.params.id })
      .then(response => { clubData.value = response.data.club ,console.log(clubData)})
      .catch(error => {
        if (error.response.status === 404) {
          clubData.value = undefined
        }
      })

    return {
      clubData,
    }
  },
}
</script>

<style>

</style>
