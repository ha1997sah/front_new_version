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
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Ajouter une nouvelle féderation
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
            name="Federation"
            rules="required"
          >
            <b-form-group
              label="Nom Federation"
              label-for="Nom"
            >
              <b-form-input
                id="nom"
                v-model="fed.name"
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
                v-model="fed.country"
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
                v-model="fed.adress"
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
            rules="required"
          >
            <b-form-group
              label="Nom Responsable"
              label-for="managerFullName"
            >
              <b-form-input
                id="managerFullName"
                v-model="fed.managerfullName"
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
                v-model="fed.email"
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
                v-model="fed.phone"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
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
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
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
      countries,
      error:null,
      email:'',
      fed: {
        name:'',
        phone:'',
        managerfullName:'',
        email:'',
        adress:'',
        country:''

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
        const response = await authentication.isUniqueEmailFed ({
         email: this.fed.email,
     
        })
        return false;
      } catch (err) {
        if (err.response.status === 404) {
          return true;
        }
      }
    },

        onSubmit (){
      store.dispatch('app-federation/addFederation', this.fed)
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


    const blankFederationData = {
      name: '',
	    lastname: '',
	    phone: '',
      email: '',
      password: '',
      role:null,
      error:null,
    }

    const federationData = ref(JSON.parse(JSON.stringify(blankFederationData)))
    const resetfederationData = () => {
      federationData.value = JSON.parse(JSON.stringify(blankFederationData))
    }

 
    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetfederationData)

    return {
      federationData,
      refFormObserver,
      getValidationState,
      resetForm,
  
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
