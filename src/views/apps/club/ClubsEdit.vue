<template>
  <component :is="club === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="club === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-federations-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <b-tabs
      v-if="club"
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
          <span class="d-none d-sm-inline">Modifier les informations</span>
        </template>
          <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="club.avatar"
          :text="avatarText(club.name)"
          :variant="`light-${resolveUserRoleVariant(club.role)}`"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ club.name }}
      </h4>
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
            label="Club"
            label-for="username"
          >
          <validation-provider
                #default="{ errors }"
                name="name"
                rules="min:1|required"
              >
            <b-form-input
              id="username"
              v-model="club.name"
            />
              <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Pays"
            label-for="full-name"
          >

         <validation-provider
                #default="{ errors }"
                name="name"
                rules="min:3|required"
              >
            <b-form-input
              id="full-name"
              v-model="club.country"
            />
              <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Adresse"
            label-for="adress"
          >
           <validation-provider
                #default="{ errors }"
                name="name"
                rules="min:3|required"
              >
            <b-form-input
              id="adress"
               v-model="club.adress"
              type="text"
            />
              <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
          </b-form-group>
        </b-col>

           <b-col
          cols="12"
          md="4"
        >
          <b-form-group
              label="Numéro de téléphone"
            label-for="phone"
          >
           <validation-provider
                #default="{ errors }"
                name="name"
                rules="num|required"
              >
            <b-form-input
              id="phone"
               v-model="club.phone"
            />
              <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="E-mail"
            label-for="email"
          >
           <validation-provider
                #default="{ errors }"
                name="email"
                rules="unique|required"
              >
            <b-form-input
              id="email"
              v-model="club.email"
            />
              <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
          </b-form-group>
        </b-col>
        <!-- nom responsable -->
          <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Responsable"
            label-for="responsable"
          >
           <validation-provider
                #default="{ errors }"
                name="responsable"
                rules="min:2|required"
              >
            <b-form-input
              id="responsable"
               v-model="club.managerfullName"
            />
              <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>

    <!-- PERMISSION TABLE -->
   
    <!-- Action Buttons -->
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
  BTab, BTabs, BCard, BAlert, BLink, BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCardHeader, BCardTitle, BFormCheckbox,

} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import clubStoreModule from './clubStoreModule'
import useClubsList from './useClubsList'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { required, email } from '@validations'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import authentication from '@/services/authentication.js'




export default {
  components: {
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
     ValidationProvider,
    ValidationObserver,
  },
   data() {
    return {
      required,
      email: '',
      email,
      club:{},
      error:''
      }
      
      },
       mounted() {
    extend("unique", {
      validate: this.isUsernameUnique,
      message: "Le champ email est déja utilisé"
    });
  extend('num', {
  validate: value => {
    return value >0;
  },
  message:"Le champ numéro de téléphone ne peut contenir que des chiffres"
})
  },
     created() {
      
    this.$store.dispatch('app-club/fetchClubById')
      .then(response => { this.club = response.data.club,console.log(this.club)})
      .catch(error => {
        if (error.response.status === 404) {
          this.club = undefined
        }
      })
    },

      methods :{
          async isUsernameUnique() {
      try {
        const response = await authentication.isUniqueEmail ({
         email: this.club.email
        })
        return false;
      } catch (err) {
        if (err.response.status === 404) {
          return true;
        }
      }
    },
 
          onSubmit  () {
          store.dispatch('app-club/editClub', this.club )
          .then(
          response => {
              this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Operation réussi',
              text:"les informations ont été modifiées avec succès",
              icon: 'AlertTriangleIcon',
              variant: 'success',
            },
          }),  router.replace({path: '/apps/clubs/list'}) 

            }) .catch(this.error)(console.log("vv"))
    }
      },
  setup() {
    const toast = useToast()

    const { resolveUserRoleVariant } = useClubsList()

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

      // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.federationData.avatar = base64
    })
  
    const CLUB_APP_STORE_MODULE_NAME = 'app-club'
   

    // Register module
    if (!store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.registerModule(CLUB_APP_STORE_MODULE_NAME, clubStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.unregisterModule(CLUB_APP_STORE_MODULE_NAME)
    })

   

      return {
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>

<style>

</style>
