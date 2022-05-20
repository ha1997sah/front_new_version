<template>
  <component :is="catData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="catData === undefined"
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

    <b-tabs
      v-if="catData"
      pills
    >

      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Modifier les informtions</span>
        </template>
          <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="catData.avatar"
          :text="avatarText(catData.nameCat)"
          :variant="`light-${resolveUserRoleVariant(catData.nameCat)}`"
          size="90px"
          rounded
        />
      </template>
       <div class="d-flex flex-wrap">
      <h4 class="mb-1">
        {{ catData.nameCat }}
      </h4>
      </div>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Modifier</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Supprimer</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form
>
      <b-row>

        <!-- Field: Username -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Titre"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="user.nameCat"
              :placeholder="catData.nameCat"

            />
          </b-form-group>
        </b-col>
          <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Age"
            label-for="username"
          >
            <b-form-input
              id="username"
                 v-model="user.age"
              :placeholder="catData.age"
              />
          </b-form-group>
        </b-col>

           <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Poids"
            label-for="username"
          >
            <b-form-input
              id="username"
                 v-model="user.weight"
              :placeholder="catData.weight"
            />
          </b-form-group>
        </b-col>


        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Type"
            label-for="full-name"
          >
            <b-form-input
              id="full-name"
              v-model="user.type"
              :placeholder="catData.type"
              

            />
          </b-form-group>
        </b-col>
       
      </b-row>
    </b-form>
    <b-button
      variant="primary"
      type="button"
      @click="onSubmit"
   class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Valider
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Effacer
    </b-button>
  </div>
       
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,BFormDatepicker, BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCardHeader, BCardTitle, BFormCheckbox,

} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import competitionStoreModule from './competitionStoreModule'
import useCompetitionsList from './useCompetitionsList'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'



export default {
  components: {
    BFormDatepicker,
    BTab,
    BTabs,
    BAlert,
    BLink,
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
  
  },
  setup() {
    const toast = useToast()

    const { resolveUserRoleVariant } = useCompetitionsList()
          const blankData = {}
    const user = ref(JSON.parse(JSON.stringify(blankData)))
 

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Maintainer', value: 'maintainer' },
      { label: 'Subscriber', value: 'subscriber' },
    ]

     const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

     const permissionsData = [
      {
        module: 'Admin',
        read: true,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'Staff',
        read: false,
        write: true,
        create: false,
        delete: false,
      },
      {
        module: 'Author',
        read: true,
        write: false,
        create: true,
        delete: false,
      },
      {
        module: 'Contributor',
        read: false,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'User',
        read: false,
        write: false,
        create: false,
        delete: true,
      },
    ]
      // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.catData.avatar = base64
    })
    const catData = ref(null)
    const club = ref(null)


    const COMPETITION_APP_STORE_MODULE_NAME = 'app-competition'
        const onSubmit = () => {
          store.dispatch('app-competition/editCompetition', catData.value )
        .then(() => {
          response => { catData.value = response.data.club,window.location.reload(false)}

             toast({
            component: ToastificationContent,
            props: {
              title: 'Operation réussi',
              text:"les informations ont été modifiées avec succès",
              icon: 'AlertTriangleIcon',
              variant: 'success',
            },
          }
          ),
                  router.replace({path: '/apps/competitions/list'}) 


        }).catch({error:error.message})
    }

    // Register module
    if (!store.hasModule( COMPETITION_APP_STORE_MODULE_NAME)) store.registerModule( COMPETITION_APP_STORE_MODULE_NAME, competitionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule( COMPETITION_APP_STORE_MODULE_NAME)) store.unregisterModule( COMPETITION_APP_STORE_MODULE_NAME)
    })

   
     store.dispatch('app-competition/fetchCatById', { id: router.currentRoute.params.id })
      .then(response => { catData.value = response.data.cat 
      catData.value.start= (response.data.competition.start).getFullYear()
      console.log(catData)})
      .catch(error => {
        if (error.response.status === 404) {
          catData.value = undefined
        }
      })

      return {
      onSubmit,
      catData,
      club,
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,
      permissionsData,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
      user
    }
  },
}
</script>

<style>

</style>
