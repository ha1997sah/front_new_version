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
          Ajouter une catégorie
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
            name="titre"
            rules="required"

          >
            <b-form-group
              label="Titre"
              label-for="titre"
            >
              <b-form-input
                id="titre"
                v-model="clubData.nameCat"
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
             
          <!-- type -->
            <validation-provider
            #default="validationContext"
            name="Type"
          >
            <b-form-group
              label="Type"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="selectedType"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="karateOptions"
                :clearable="false"
                input-id="karate_type"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        

             <validation-provider
            #default="validationContext"
            name="Sexe"
            rules="required"

          >
            <b-form-group
              label="Sexe"
              label-for="sexe">
     <div class="demo-inline-spacing">
      <b-form-radio
        v-model="selected"
        plain
        name="some-radios3"
        value="femme"
      >
        Femme
      </b-form-radio>
      <b-form-radio
        v-model="selected"
        plain
        name="some-radios3"
        value="homme"
      >
        Homme
      </b-form-radio>
    </div>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
             <validation-provider
            #default="validationContext"
            name="Age"
           rules="required"

          >
            <b-form-group
              label="Catégorie d'age"
              label-for="age"
              rules="required"

            >
            <multiselect
      v-model="selectedDate"
      :options="yearOptions"
        :multiple="true"
      >
    </multiselect>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
      <validation-provider
            #default="validationContext"
            name="Poids"
          >
            <b-form-group
              label="Catégorie des poids"
              label-for="poids"
              rules="required"

            >
            <multiselect
      v-model="selectedWeight"
      :options="weightOptions"
        :multiple="true"
      >
    </multiselect>
             
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>    


     
    
          <!-- User Role -->

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              :disabled="invalid"

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
  BSidebar, BForm,BFormFile,BFormDatepicker, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,BFormRadio,
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
import Multiselect from 'vue-multiselect'
import authentication from '@/services/authentication.js'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import flatPickr from 'vue-flatpickr-component'


export default {

  components: {
    flatPickr,
    BSidebar,
    BFormRadio,
    Multiselect ,
    BFormFile,
    BFormDatepicker,
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
      file:""


    }
  },
  setup(props, { emit }) {
    const toast = useToast()
    const selected  = ref("homme")
    const selectedDate= ref(null)
    const selectedWeight=ref(null)
    const dateStart=ref(null)
    const dateEnd=ref(null)
    const karateOptions= ref(['Kata','Kumite','Groupe Kata','Groupe Kumite'])
    const yearOptions= ref(['2000', '2001', '2002'])
    const weightOptions= ref(['75 kg', '50 kg', '54 kg'])

    const test = ref ([])
    const blankclubData = {
      name: '',
	    lastname: '',
	    phone: '',
      email: '',
      password: '',
      role:null,
      error:null,
    }     
           const selectedType=ref("")
           const file = ref(null)
           const ch= ref("")
           const strWeight=ref("")
    const clubData = ref(JSON.parse(JSON.stringify(blankclubData)))
    const resetclubData = () => {
      clubData.value = JSON.parse(JSON.stringify(blankclubData))
    }
      const selectFile=(e) => {
   file.value=e.target.files[0]
  console.log(file.value)

      }
    const onSubmit = () => { 
       selectedDate.value.forEach(element => console.log(ch.value+=element+"/"))
       selectedWeight.value.forEach(element => console.log(strWeight.value+=element+"/"))
      store.dispatch('app-competition/addCategory',{
        nameCat:selectedType.value +":"+clubData.value.nameCat,
        sexe:selected.value,
        type:selectedType.value,
        age:ch.value,
        weight:strWeight.value,
        start:dateStart.value,
        end:dateEnd.value,
      })
        .then(() => {
            toast({
          component: ToastificationContent,
          props: {
            title: 'Opération réussi',
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
    } = formValidation(resetclubData)

    return {
      clubData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
      selectFile,
      file,
      selected,
      selectedDate,
      yearOptions,
      weightOptions,
      ch,
      strWeight,
      selectedWeight,
      dateStart,
      dateEnd,
      karateOptions,
      selectedType
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import'@core/scss/vue/libs/vue-flatpicker.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
