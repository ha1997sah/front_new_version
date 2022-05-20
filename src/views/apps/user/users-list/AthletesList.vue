<template>
  <div>
    <!-- Filters -->
<!--     <users-list-filters
      :role-filter.sync="roleFilter"
      :plan-filter.sync="planFilter"
      :status-filter.sync="statusFilter"
      :role-options="roleOptions"
      :plan-options="planOptions"
      :status-options="statusOptions"
    />
 -->
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="3"
          >
       
          Sexe
         <v-select
              v-model="selectedItem1"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                :clearable="false"
                input-id="club-fed"
                @input="filterBySexe"
              />
      
      
          </b-col>
            <b-col
            cols="12"
            md="3"
          >
         Niveau
         <v-select
              v-model="selectedItem2"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="levels"
                :clearable="false"
                input-id="club-fed"
                @input="filterByLevel"
              />
      
      
          </b-col>
          
   <b-col
            cols="12"
            md="3"
          >
         Club
         <v-select
              v-model="selectedItem3"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="clubs"
                :clearable="false"
                input-id="club-users"
                @input="filterByClub"
              />
      
      
          </b-col>
          
             <b-col
            cols="12"
            md="3"
          >
          Federation
         <v-select
              v-model="selectedItem4"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="feds"
                :clearable="false"
                input-id="fed-users"
                @input="filterByFed"
              />
      
      
          </b-col>
          
        </b-row>

      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="usersItems"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: User -->
        <template #cell(Nom)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :text="avatarText(data.item.lastname)"
                :variant="`light-${resolveUserRoleVariant(data.item.lastname)}`"
                :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.lastname }}
            </b-link>
          </b-media>
        </template>

               <template #cell(Prénom)="data">
          <b-media vertical-align="center">
            
            <b-link
              :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
          </b-media>
        </template>

        <!-- Column: Role -->
    
         <template #cell(Matricule)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.matricule)}`"
            class="text-capitalize"
          >
            {{ data.item.matricule }}
          </b-badge>
        </template>


        <!-- Column: Actions -->
           <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Détailes</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Modifier</span>
            </b-dropdown-item>

             <b-dropdown-item  v-b-modal.modal-1 @click="sendInfo(data.item.id )">               
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50" >Supprimer</span>
            </b-dropdown-item>
          </b-dropdown>
              
        </template>
    
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalUsers"
              :per-page="perPage"
              first-number
              last-number

              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    <b-modal id="modal-1" title="BootstrapVue"
     
          @ok="handleOk">
             <p class="my-4">Cette action ne peut pas être annulée!</p>
  
             </b-modal>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import UsersListFilters from './UsersListFilters.vue'
import useUsersList from './useUsersList'
import userStoreModule from '../userStoreModule'
import UserListAddNew from './UserListAddNew.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import router from '@/router'

export default {
  components: {
    UsersListFilters,
    UserListAddNew,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },
  setup() {
      const toast = useToast()

    const USER_APP_STORE_MODULE_NAME = 'app-user'
    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
     
    const isAddNewUserSidebarActive = ref(false)
    const clubs=ref([])
    const feds=ref([])
      const usersItems = ref(null)
      const roleOptions = [
       { label:"femme", value:"femme"},
      {  label:"homme",value:"homme"}
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

      const levels = [
      { label: 'Cadests', value: 'Cadests' },
      { label: 'Minimes', value: 'Minimes' },
      { label: 'Benjamins', value: 'Benjamins' },
    ]
    const selectedItem1 = ref('')
    const selectedItem2 = ref('')
    const selectedItem3 = ref('')
    const selectedItem4 = ref('')
    store.dispatch('app-user/fetchAthletes')
      .then(response => {
        usersItems.value=response.data.users,
         console.log("users",usersItems)
       
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
          const idSelected=ref('')

      const sendInfo = (info) =>{
        console.log(idSelected.value)
       idSelected.value=info }
    
  const handleOk= () =>{
    store.dispatch('app-user/deleteUser',   idSelected.value)
    .then(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'user deleted',
            icon: 'AlertTriangleIcon',
            variant: 'success',
          },
        })
        router.replace({path: '/apps/users/list'}) 
    }).catch(error=>{console.log(error),
       toast({
      component: ToastificationContent,
      props: {
        title: 'problem',
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })})
}

      // filter by sexe
      const filterBySexe = () => {
     selectedItem2.value = "",
     selectedItem3.value = "",
     selectedItem4.value = "",
     store.dispatch('app-user/fetchAthletesBysexe',selectedItem1.value.value)
       .then(response => {
                      usersItems.value=null

usersItems.value=response.data.users
         console.log(usersItems)
       
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })}
      // filter by level
         const filterByLevel = () => {
  selectedItem1.value = "",
     selectedItem3.value = "",
     selectedItem4.value = "",
     store.dispatch('app-user/fetchAthletesByLevel',selectedItem2.value.value)
       .then(response => {
             usersItems.value=null

         usersItems.value=response.data.users
         console.log(usersItems)
       
      })
      .catch((error) => {
        console.log(error.message)
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })}

      // filter by club

     const filterByClub = () => {
   selectedItem1.value = "",
     selectedItem2.value = "",
     selectedItem4.value = "",
     store.dispatch('app-user/fetchUsersClub',(selectedItem3.value.value.toString()))
        .then(response => {
          usersItems.value=null

         usersItems.value=response.data.users
         console.log(usersItems)
       
      })
      .catch(() => {
       
      })}
      // filter by fed
      
     const filterByFed = () => {
            selectedItem1.value = "",
     selectedItem3.value= "",
     selectedItem2.value = "",
     store.dispatch('app-user/fetchUsersUnderFed',(selectedItem4.value.value.toString()))
        .then(response => {
         usersItems.value=null
         usersItems.value=response.data.users
         console.log(usersItems)
       
      })
      .catch(() => {
       
      })}
      
// all clubs
 axios.get("http://localhost:3001/allClubs").then(
   response=>{
const data = response.data.clubs
data.forEach(element => { clubs.value.push({label:element.name, value:element.id}),
  console.log(clubs)
});
 })

// all feds
 axios.get("http://localhost:3001/allFederations").then(
   response=>{
const data = response.data.feds
data.forEach(element => { feds.value.push({label:element.name, value:element.id})
  console.log(feds)
});
})




    
    const {
     
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
      refetchData,
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
      toast,
      isAddNewUserSidebarActive,
      levels,
      filterBySexe,
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
      refetchData,
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
      usersItems,
      filterByLevel,
      filterByFed,
      filterByClub,
      filterBySexe,
      feds,
      clubs,
      selectedItem1,
      selectedItem2,
      selectedItem3,
      selectedItem4,
      handleOk,
      sendInfo,
      idSelected
    }
    
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>