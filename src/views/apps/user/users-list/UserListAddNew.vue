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
          Add un nouveau utilisateur
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
            name="Nom"
            rules="required"
          >
            <b-form-group
              label="Nom"
              label-for="Nom"
            >
              <b-form-input
                id="nom"
                v-model="admin.lastname"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="John Doe"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Username -->
          <validation-provider
            #default="validationContext"
            name="Prénom"
            rules="required"
          >
            <b-form-group
              label="Prénom"
              label-for="prénom"
            >
              <b-form-input
                id="prenom"
                v-model="admin.name"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Email -->
          <validation-provider
            #default="validationContext"
            name="Email"
            rules="required|email"
          >
            <b-form-group
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="admin.email"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

             <!-- password -->
          <validation-provider
            #default="validationContext"
            name="Password"
            rules="required"
          >
            <b-form-group
              label="Password"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="admin.password"
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
            rules="required"
          >
            <b-form-group
              label="phone"
              label-for="phone"
            >
              <b-form-input
                id="contact"
                v-model="admin.phone"
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
            rules="required"
          >
            <b-form-group
              label="Role"
              label-for="role"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="admin.role"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-role"
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
              Cancel
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
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
  
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      countries,
      error:null,
      admin:{
       lastname:'',
        name:'',
        phone:'',
        role: '',
        image:'',
        email:'',
        password :'',

      }

    }
  },
  methods:{
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
      store.dispatch('app-user/addAdmin', this.admin)
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

    const blankUserData = {
      name: '',
	    lastname: '',
	    phone: '',
      email: '',
      password: '',
      role:null,
    }

    const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
    }

    const onSubmit = () => {
      store.dispatch('app-user/addUser', userData.value)
        .then(() => {
             toast({
          component: ToastificationContent,
          props: {
            title: 'Opération Réussi',
            icon: 'AlertTriangleIcon',
            variant: 'success',
          },
        })

          emit('refetch-data')
          emit('update:is-add-new-user-sidebar-active', false)
        }).catch({error:error.message})
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetuserData)

    return {
      userData,
      onSubmit,
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
