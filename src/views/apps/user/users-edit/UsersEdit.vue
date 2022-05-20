<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">

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

    <b-tabs
      v-if="userData"
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
          <span class="d-none d-sm-inline">Modifier les informtions </span>
        </template>
          <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="userData.image"
          :text="avatarText(user.name)"
          :variant="`light-${resolveUserRoleVariant(userData.role)}`"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ user.name }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
           :disabled="invalid"
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
              label="Prénom"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="name"
                rules="min:2"
              >
                <b-form-input
                  id="name"
                  :state="errors.length > 0 ? false:null"
                  name="register-name"
                  :placeholder="user.name"
                  v-model="data.name"

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
              label="Nom"
              label-for="lastname"
            >
              <validation-provider
                #default="{ errors }"
                name="lastname"
                                rules="min:2"

              >
                <b-form-input
                  id="lastname"
                
                  :placeholder="user.lastname"
                  v-model="data.lastname"
                  :state="errors.length > 0 ? false:null"
                  name="register-lastname"
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
              label="Email"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="email|unique"
              >
                <b-form-input
                  id="email"
                  v-model="email"
                  :state="errors.length > 0 ? false:null"
                  name="register-email"
                  :placeholder="user.email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

        </b-col>

        <!-- Field: Status -->
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
                name="phone"
                rules="num"
              >
                <b-form-input
                  id="phone"
                  v-model="data.phone"
                  :placeholder="user.phone"
                  
                  :state="errors.length > 0 ? false:null"
                  name="register-phone"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
        </b-col>

        <!-- Field: Role -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="User Role"
            label-for="user-role"
          >
            <v-select
              v-model="userData.role"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="roleOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-role"
            />
          </b-form-group>
        </b-col>

 <b-col
          cols="12"
          md="4"
        >
        
             <b-form-group
              label="Federation"
              label-for="federation"
            >
              <v-select
              v-model="selectedFed"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="feds"
                :clearable="false"
                 @input="clubUnderFed"
              />
            </b-form-group>
            </b-col>
            
      </b-row>
            <b-row>
    <!-- club -->     <b-col
          cols="12"
          md="4"
        >
            <b-form-group
              label="Club"
              label-for="club"
            >
              <v-select
              v-model="selectedItem"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="clubs"
                :clearable="false"
                input-id="club-fed"
              />
            </b-form-group>
          </b-col>
             <b-col
          cols="12"
          md="4"
        >
            <b-form-group
              label="Sexe"
              label-for="sexe">
     <div class="demo-inline-spacing">
      <b-form-radio
        v-model="selectedSexe"
        plain
        name="some-radios3"
        value="femme"
      >
        Femme
      </b-form-radio>
      <b-form-radio
        v-model="selectedSexe"
        plain
        name="some-radios3"
        value="homme"
      >
        Homme
      </b-form-radio>
    </div>
              
            </b-form-group>

           <!-- -->
        </b-col>
              </b-row>

      <b-row>
        <b-col
          cols="12"
          md="4"
        >
                <b-form-group
              label="Poids"
              label-for="weight"
            >
              
                      <v-select
              v-model="selectedWeight"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="weighttOptions"
                :clearable="false"
                input-id="club-fed"
              />

            </b-form-group>
        </b-col>
    <b-col
          cols="12"
          md="4"
        >
             <b-form-group
              label="Taille"
              label-for="height"
            >
             
                   <v-select
              v-model="selectedHeight"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="heightOptions"
                :clearable="false"
                input-id="club-fed"
              />
            </b-form-group>

        </b-col>
        <b-col
          cols="12"
          md="4"
        >
               <b-form-group
              label="Ceinture"
              label-for="belt"
            >
             
                <v-select
              v-model="selectedBelt"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="beltOptions"
                :clearable="false"
                input-id="club-fed"
              />
              
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
      Modifier
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
  BTab, BTabs, BCard, BAlert, BLink, BButton, BMedia, BAvatar, BRow, BCol, BFormRadio,BFormGroup, BFormInput, BForm, BTable, BCardHeader, BCardTitle, BFormCheckbox,

} from 'bootstrap-vue'
import { required, email } from '@validations'

import { ref, onUnmounted ,onMounted} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import userStoreModule from '../userStoreModule'
import UserEditTabAccount from './UserEditTabAccount.vue'
import UserEditTabInformation from './UserEditTabInformation.vue'
import UserEditTabSocial from './UserEditTabSocial.vue'
import useUsersList from '../users-list/useUsersList'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import axios from 'axios'
import { retrieveColumnLayout } from 'echarts/lib/layout/barGrid'
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
    BFormRadio,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial,
     ValidationProvider,
    ValidationObserver,
  },
   data() {
    return {
      required,
      email: '',
      email,

      }},
    mounted() {
    extend("unique", {
      validate: this.isUsernameUnique,
      message: "Username already taken"
    });
            extend('num', {
  validate: value => {
    return value >0;
  },
  message: 'This field must be an odd number'
})
  },
      methods :{
          async isUsernameUnique() {
      try {
        const response = await authentication.isUniqueEmail ({
         email: this.email
     
        })
        return false;
      } catch (err) {
        if (err.response.status === 404) {
          return true;
        }
      }
    },
        clubUnderFed() {
      console.log("okkkkkkkkkkkkkkkkkkkk")
     axios.post("http://localhost:3001/clubUnderFed",{id:this.selectedFed.value}).then(
   response=>{
const data = response.data.clubs
data.forEach(element => { this.roleOptions.push({label:element.name, value:element.id})
  console.log(this.roleOptions)
});
   } )},
      },
  setup() {
    const toast = useToast()
            const blankData = {}
    const data = ref(JSON.parse(JSON.stringify(blankData)))
    const selectedWeight = ref('')
    const selectedHeight = ref('')
    const selectedBelt = ref('')
    const selectedFed = ref('')
    const selectedSexe=ref('')



    const { resolveUserRoleVariant } = useUsersList()

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

     const  beltOptions=[
        "noir","jaune"
      ]
     const heightOptions=[
        "1.75 cm",
        "1.76 cm",
        "1.77 cm"
      ]
     const  weighttOptions=[
       "75 kg",
        "80 kg",
        "10 kg"
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
    const selectedItem= ref('')


    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.userData.avatar = base64
    })
    const userData = ref(null)
    const user = ref(null)
    const clubs=ref([])


    const USER_APP_STORE_MODULE_NAME = 'app-user'
  axios.get("http://localhost:3001/allClubs").then(
   response=>{
const data = response.data.clubs
data.forEach(element => { clubs.value.push({label:element.name, value:element.id}),
  console.log(clubs)
});
 })
    const feds=ref([])

  axios.get("http://localhost:3001/allFederations").then(
   response=>{
const data = response.data.feds
data.forEach(element => { feds.value.push({label:element.name, value:element.id})
  console.log(feds)
});
})
    // Edit user function 
    const onSubmit = () => {

      data.value.belt=selectedBelt.value,
      data.value.height=selectedHeight.value,
      data.value.weight=selectedWeight.value,
      data.value.ClubId=selectedItem.value.value,
      data.value.FederationId=selectedFed.value.value,
      data.value.sexe=selectedSexe.value
      console.log(data.value.sexe)
            console.log(data.value.height)

      store.dispatch('app-user/editUser', data.value )
        .then(
          response => {
          user.value = response.data.user ,
              toast({
            component: ToastificationContent,
            props: {
              title: 'Operation réussi',
              text:"les informations ont été modifiées avec succès",
              icon: 'AlertTriangleIcon',
              variant: 'success',
            },
          }),
                  router.replace({path: '/apps/athletes/list'}) 

            }) .catch(error)({error:error.message})}


    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user/fetchUser', { id: router.currentRoute.params.id })
      .then(response => { userData.value = response.data ,userData.value.image=`http://localhost:3001/${response.data.image}`})
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })
     store.dispatch('app-user/fetchUserById')
      .then(response => { user.value = response.data.user ,console.log(response.data.user)})
      .catch(error => {
        if (error.response.status === 404) {
          user.value = undefined
        }
      })

      
      return {
      onSubmit,
      userData,
      user,
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,
      permissionsData,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
      clubs,
      selectedItem,
      data,
      beltOptions,
      weighttOptions,
      heightOptions,
       selectedWeight ,
    selectedHeight ,
selectedBelt ,
 selectedItem,
        selectedFed, 
        feds,
        selectedSexe
    }
  },
}
</script>

<style>

</style>
