<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
   
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Ajouter un nouveau club
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- Full Name -->
          <validation-provider
            #default="validationContext"
            name="Club"
            rules="required"

          >
            <b-form-group
              label="Nom Club"
              label-for="Nom"
            >
              <b-form-input
                id="nom"
                v-model="club.name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Country -->
          <validation-provider
            #default="validationContext"
            name="Pays"
            rules="required"

          >
            <b-form-group
              label="Pays"
              label-for="country"
            >
              <b-form-input
                id="country"
                v-model="club.country"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

             <validation-provider
            #default="validationContext"
            name="Adresse"
            rules="required"

          >
            <b-form-group
              label="Adresse"
              label-for="adress"
            >
              <b-form-input
                id="adress"
                v-model="club.adress"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

            <validation-provider
            #default="validationContext"
            name="Nom Responsable"
            rules="required|"

          >
            <b-form-group
              label="Nom Responsable"
              label-for="managerFullName"
            >
              <b-form-input
                id="managerFullName"
                v-model="club.managerfullName"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>  

          <validation-provider
            #default="validationContext"
            name="E-mail"
            rules="unique|email|required"
          >
            <b-form-group
              label="E-mail"
              label-for="contact"
            >
              <b-form-input
                id="contact"
                v-model="club.email"
                :state="getValidationState(validationContext)"
                trim
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Company -->
          <validation-provider
            #default="validationContext"
            name="Numéro de téléphone"
            rules="required|num"
          

          >
            <b-form-group
              label="Numéro de téléphone"
              label-for="phone"
            >
              <b-form-input
                id="phone"
                v-model="club.phone"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- User Role -->
          <validation-provider
            #default="validationContext"
            name="Role"
          >
            <b-form-group
              label="Fédération"
              label-for="role"
              :state="getValidationState(validationContext)"
            >
              <v-select
              v-model="selectedItem"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                :clearable="false"
                input-id="club-fed"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Ajouter
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Effacer
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import router from '@/router'

import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver,extend} from 'vee-validate'

import { ref,onMounted } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'

import authentication from '@/services/authentication.js'

export default {

  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
    planOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      location,
      countries,
      error:null,
              selectedItem:'',

      email:'',
         club: {
        name:'',
        phone:'',
        managerfullName:'',
        email:'',
        adress:'',
        country:'',
        FederationId:""

      }


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
  methods: {
       async isUsernameUnique() {
      try {
        const response = await authentication.isUniqueEmailClub ({
         email: this.club.email,
     
        })
        return false;
      } catch (err) {
        if (err.response.status === 404) {
          return true;
        }
      }
    },

        onSubmit (){

this.club.FederationId=this.selectedItem.value
      store.dispatch('app-club/addClub', this.club)
        .then(() => {
             this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Opération réussi',
            icon: 'AlertTriangleIcon',
            text:"Fédeération ajouté avec succes ",
            variant: 'success',
          },
        })

          this.$emit('refetch-data')
          this.$emit('update:is-add-new-user-sidebar-active', false)
        }).catch({message:error.message})
    }
  },
 
  setup(props, { emit }) {
        const toast = useToast()
 

    const blankclubData = {
      name: '',
	    lastname: '',
	    phone: '',
      email: '',
      password: '',
      role:null,
      error:null,
    }

    const clubData = ref(JSON.parse(JSON.stringify(blankclubData)))
    const resetclubData = () => {
      clubData.value = JSON.parse(JSON.stringify(blankclubData))
    }


    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetclubData)

    return {
      clubData,
      refFormObserver,
      getValidationState,
  
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
