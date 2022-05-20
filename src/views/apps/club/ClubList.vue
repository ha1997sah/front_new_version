<template>

  <div>

     <club-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />
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
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                  v-model="query"
                 @keyup="search"
                class="d-inline-block mr-1"
                placeholder="Rechercher..."
              />
              <b-button
                variant="primary"
                @click="isAddNewUserSidebarActive = true"
              >
                <span class="text-nowrap">Ajouter club</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="clubList"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: User -->
        <template #cell(Club)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :text="avatarText(data.item.name)"
                :variant="`light-${resolveUserRoleVariant(data.item.name)}`"
                :to="{ name: 'apps-clubs-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'apps-clubs-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
          </b-media>
        </template>

               <template #cell(Pays)="data">
          <b-media vertical-align="center">
            
            <b-link
              :to="{ name: 'apps-clubs-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
          </b-media>
        </template>
            <template #cell(Responsable)="data">
          <b-media vertical-align="center">
            
            <b-link
              :to="{ name: 'apps-clubs-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.managerfullName }}
            </b-link>
          </b-media>
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
            <b-dropdown-item :to="{ name: 'apps-clubs-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Détailes</span>
            </b-dropdown-item>
             <b-dropdown-item :to="{ name:'apps-clubs-edit', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
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
import router from '@/router'
import authentication from '@/services/authentication.js'
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useClubsList from './useClubsList'
import clubStoreModule from './clubStoreModule'
import ClubListAddNew from './ClubListAddNew.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'


export default {
  components: {
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
    ClubListAddNew,
  },
    data() {
    return {
      clubList: [],
      query:'',
    }
  },
        created() {
      authentication
          .allClubs()
          .then(response =>  { 
                this.clubList = response.data.clubs ,console.log(this.clubList)
            })
          .catch(error => error.message)
          },
  methods:{
      search () {
      authentication
          .allClubs()
          .then(response =>{
             if (this.query) {
           this.clubList = response.data.clubs.filter(club =>
              club.name.toLowerCase().includes(this.query.toLowerCase()))
          } else {
           this.clubList =response.data.clubs
          }}) }
  },

  setup(props, { emit }) {
          const toast = useToast()

    const CLUB_APP_STORE_MODULE_NAME = 'app-club'
    // Register module
    if (!store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.registerModule(CLUB_APP_STORE_MODULE_NAME, clubStoreModule)
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.unregisterModule(CLUB_APP_STORE_MODULE_NAME)
    })
    const isAddNewUserSidebarActive = ref(false)
 const fedData= []
  const roleOptions = ref([])
 axios.get("http://localhost:3001/allFederations").then(
   response=>{
const data = response.data.feds
data.forEach(element => { roleOptions.value.push({label:element.name, value:element.id})
  console.log(roleOptions)
});


   }

 )
  const idSelected=ref('')

      const sendInfo = (info) =>{
        console.log(idSelected.value)
       idSelected.value=info }
    
  const handleOk= () =>{
    store.dispatch('app-club/deleteClub',   idSelected.value)
    .then(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Club supprimé',
            icon: 'AlertTriangleIcon',
            variant: 'success',
          },
        }),
window.location.reload()
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
      fetchClubs,
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
    } = useClubsList()
  
    return {
      // Sidebar
      isAddNewUserSidebarActive,
      fetchClubs,
      toast,
     
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
      fedData,
      sendInfo,
      handleOk
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