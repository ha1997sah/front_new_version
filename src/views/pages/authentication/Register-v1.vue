<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">
            Vuexy
          </h2>
        </b-link>

        <b-card-text class="mb-2">
                Créer un nouveau compte
        </b-card-text>

        <!-- form -->
        <validation-observer ref="registerForm" v-slot="{ invalid }">
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="validationForm" enctype="multipart/form-data"
          >
            <!-- name -->
                <b-tabs v-model="currentTab">

         <b-tab active>
          <template #title>
        
          <span class="d-none d-sm-inline">Etape 1</span>
        </template>
            <b-form-group
              label="Prénom"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="name"
                rules="required|min:3"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  :state="errors.length > 0 ? false:null"
                  name="register-name"
                  placeholder="johndoe"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- Lastname -->
            <b-form-group
              label="Nom"
              label-for="lastname"
            >
              <validation-provider
                #default="{ errors }"
                name="lastname"
                rules="required|min:3"
              >
                <b-form-input
                  id="lastname"
                  v-model="lastname"
                  :state="errors.length > 0 ? false:null"
                  name="register-lastname"
                  placeholder="johndoe"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- email -->
            <b-form-group
              label="Email"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email|unique"
              >
                <b-form-input
                  id="email"
                  v-model="email"
                  :state="errors.length > 0 ? false:null"
                  name="register-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="Mot de passe"
              label-for="password"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
                            </b-tab>
                             <b-tab :disabled="disabledTabIndex < 1" >
              <template #title>
        
          <span class="d-none d-sm-inline">Etape 2</span>
        </template>
               <!-- phone -->
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
                  v-model="phone"
                  :state="errors.length > 0 ? false:null"
                  name="register-phone"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
              <b-form-group
              label="Matricule"
              label-for="matricule"
            >
              <validation-provider
                #default="{ errors }"
                name="matricule"
                rules="num"
              >
                <b-form-input
                  id="matricule"
                  v-model="matricule"
                  :state="errors.length > 0 ? false:null"
                  name="matricule"
                  :label="matricule_label"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
<validation-provider
      #default="{ errors }"
      name="Fédération"
      rules="required"
    >
      <b-form-group
        label="federation"
        label-for="fed"
         :state="errors.length > 0 ? false:null"
    
      >
        <v-select
        
          id="fed"
          name="fed"

          v-model="selectedFed"
          :options="fedOptions"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    @input="clubUnderFed()"


          label="label"
        />
      
      </b-form-group>
                      <small class="text-danger">{{ errors[0] }}</small>

    </validation-provider>

    <validation-provider
      #default="{ errors }"
      name="Club"
      rules="required"
    >
      <b-form-group
        label="club"
        label-for="club"
        :state="errors.length > 0 ? false:null"
      >
        <v-select
          id="club"
          v-model="selectedItem"
          :options="roleOptions"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"

        />
        <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>
           <!-- -->
               <b-form-group
              label="Date de naissance"
              label-for="Date de naissance"
            >
              <validation-provider
                #default="{ errors }"
                name="Date de naissance"
                rules="required"
              >
     <b-form-datepicker
      id="example-datepicker"
      v-model="birthDate"
      class="mb-1"
    />
     <small class="text-danger">{{ errors[0] }}</small>

          </validation-provider>
     </b-form-group>
           <!-- -->
           </b-tab>
   <b-tab :disabled="disabledTabIndex < 2" >
          <template #title>
        
          <span class="d-none d-sm-inline">Etape 3</span>
        </template>
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
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

         
             <b-form-group
              label="Poids"
              label-for="weight"
            >
              <validation-provider
                #default="{ errors }"
                name="weight"
                rules="required"
              >
                      <v-select
              v-model="selectedWeight"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="weighttOptions"
                :clearable="false"
                input-id="club-fed"
              />
        <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
             <b-form-group
              label="Taille"
              label-for="height"
            >
              <validation-provider
                #default="{ errors }"
                name="height"
                rules="required"
              >
                   <v-select
              v-model="selectedHeight"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="heightOptions"
                :clearable="false"
                input-id="club-fed"
              />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- -->
            

             <b-form-group
              label="Ceinture"
              label-for="belt"
            >
              <validation-provider
                #default="{ errors }"
                name="belt"
                rules="required"
              >
                <v-select
              v-model="selectedBelt"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="beltOptions"
                :clearable="false"
                input-id="club-fed"
              />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
       
         
     
           <b-form-group
              label="Certificat medical"
              label-for="Certificat medical"
            >
              <validation-provider
                #default="{ errors }"
                name="Certificat medical"
                rules="required"
              >
                <b-form-file
                v-model="file"
               placeholder="Choose a file or drop it here..."
                 drop-placeholder="Drop file here..."
                 ref="file"
                 @change="selectFile"
                   />
                 <small class="text-danger">{{ errors[0] }}</small>

          </validation-provider>
     </b-form-group> 
     
                </b-tab>



                <!-- records -->
<b-tab :disabled="disabledTabIndex < 3">
  <template #title>
       
           <span class="d-none d-sm-inline">Etape 4</span>
        </template>
                <div class="form-group" v-for="(input,k) in inputs" :key="k">
   <b-row>
      <b-col md="6">
       
     <input type="text" class="form-control" v-model="input.title">

       </b-col>
      <b-col md="6">
    
                <b-form-group
            >
             
     <b-form-datepicker
      id="example-datepicker"
      v-model="input.recordDate"
      class="mb-1"
    />
   
     </b-form-group>
        </b-col>
        </b-row>
    <span>
        <i @click="remove(k)" v-show="k || ( !k && inputs.length > 1)">supprimer</i>
        <i  @click="add(k)" v-show="k == inputs.length-1">ajouter</i>
    </span>
</div>

</b-tab>
                    </b-tabs>
                    <div>
            <b-row>
                     <b-col
        md="2"
       
      >

              <b-button-group>
           
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          class="btn-icon"
          variant="outline-primary"
          @click="disabledTabIndex--"
            :disabled="disabledTabIndex<1"

        >
          <feather-icon icon="ChevronsLeftIcon" />
        </b-button>
      
      </b-button-group>
   </b-col>
                        <b-col
        md="8"
       
      >

             <b-button
              variant="primary"
              type="button"
              block
              @click="register"
              :disabled="invalid"
            >
              Register
            </b-button>
            </b-col>
              <b-col
        md="2"
       
      >

       <b-button-group>
      
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          class="btn-icon"
          variant="outline-primary"
                   @click="disabledTabIndex++"
                 :disabled="disabledTabIndex>2"

        >
          <feather-icon icon="ChevronsRightIcon" />
        </b-button>
      </b-button-group>
      </b-col>
      </b-row>
          </div>


          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Vous avez déja un compte?  </span>
          <b-link :to="{name:'auth-login1'}">
            <span>Connexion</span>
          </b-link>
        </b-card-text>

        <div class="divider my-2">
          <div class="divider-text">
            ou
          </div>
        </div>

        <!-- social buttons -->
        <div class="auth-footer-btn d-flex justify-content-center">
          <b-button
            variant="facebook"
            href="javascript:void(0)"
          >
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button
            variant="twitter"
            href="javascript:void(0)"
          >
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button
            variant="google"
            href="javascript:void(0)"
          >
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button
            variant="github"
            href="javascript:void(0)"
          >
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div>
      </b-card>
    <!-- /Register v1 -->
    </div>
  </div>

</template>
<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {mapState} from 'vuex'
import axios from 'axios'
import Ripple from 'vue-ripple-directive'


import {
  BCard, BLink,BFormFile, BFormDatepicker, BCardTitle, BCardText, BForm,BFormInvalidFeedback,BButtonToolbar,
  BButton, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend, BFormCheckbox, BAlert,BTab, BTabs,BCol,BRow,BFormRadio
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import authentication from '@/services/authentication.js'
import { password } from '@/@core/utils/validations/validations'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import useJwt from '@/auth/jwt/useJwt'



export default {
  components: {
    BFormRadio,
    VuexyLogo,
    BButtonToolbar,
    BTab, BTabs,
    BAlert,
    BFormInvalidFeedback,
    BFormDatepicker,
    vSelect,
    flatPickr,
    // BSV
    BCard,
    BLink,
    BCol,
    BRow,
    BCardTitle,
    BCardText,
    BForm,
    BFormFile,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
        inputs: [
            {   recordDate:"",
                title: ''
            }
        ],
        in:[],
       name: '',
	    lastname: '',
      position: 'admin',
	    phone: '',
      email: '',
      password: '',
      weight:'',
      height:'',
      belt:'',
      birthDate:'',
      certification:'',
      medicalCertificate:'',
      error: null,
      success:false,
      selectedItem:'',
      selectedBelt:'',
      selectedHeight:'',
      selectedWeight:'',
      selectedFed:'',
      selectedSexe:'',
      file:"",
      matricule:"",
      matricule_label:"Non disponible",
     roleOptions :[],
       fedOptions :[],
      currentTab: 0,
      disabledTabIndex: 0,

      // validation rules
      required,
      email,
      clubs:[
        {label:"club1", value:"2"},
        {label:"club2", value:"3"},
      ],
       beltOptions:[
        "noir","jaune"
      ],
      heightOptions:[
        "1.75 cm",
        "1.76 cm",
        "1.77 cm"
      ],
       weighttOptions:[
       "75 kg",
        "80 kg",
        "10 kg"
      ]
    }
  },
   directives: {
    Ripple,
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
      ...mapState([
      'isUserLoggedIn',
      'user',
    ])
  },
    watch: {
    disabledTabIndex(newVal) {
      this.$nextTick(() => {
        this.currentTab = newVal;
      })
    }},
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
     axios.get("http://localhost:3001/allFederations").then(
   response=>{
const data = response.data.feds
data.forEach(element => { this.fedOptions.push({label:element.name, value:element.id})
  console.log(this.fedOptions)
});


   })


  },
  methods: {
    clubUnderFed() {
      console.log("okkkkkkkkkkkkkkkkkkkk")
     axios.post("http://localhost:3001/clubUnderFed",{id:this.selectedFed.value}).then(
   response=>{
const data = response.data.clubs
data.forEach(element => { this.roleOptions.push({label:element.name, value:element.id})
  console.log(this.roleOptions)
});


   } )},
      add(index) {
            this.inputs.push({ name: '' });
        },
        remove(index) {
            this.inputs.splice(index, 1);
        },
    selectFile() {
      this.medicalCertificate=this.$refs.file.files[0]
    },
	async register () {
    console.log("bbbbb",this.inputs)
     try {
        const formData = new FormData();
        formData.append('medicalCertificate',this.file)
        formData.append('email',this.email)
        formData.append('password',this.password)
        formData.append('name',this.name)
        formData.append('lastname',this.lastname)
         formData.append('belt',this.selectedBelt)
         formData.append('height',this.selectedHeight)
         formData.append('weight',this.selectedWeight)

        formData.append('phone',this.phone)
        formData.append('ClubId',this.selectedItem.value)
        formData.append('FederationId',this.selectedFed.value)
                formData.append('sexe',this.selectedSexe)


        formData.append('birthDate',this.birthDate)
        formData.append('matricule',this.matricule)
        formData.append('records',JSON.stringify(this.inputs))
        
       const response = await authentication.register(formData)
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Merci d\'avoir inscrit dans notre site',
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: 'Votre demande d\'inscription a été bien enregistrer nous traitons votre demande dans le bref délais',
                    },
                  })
                })
      } catch (error) {
        this.error = error.response.data.error
            this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: this.error,
                      icon: 'CoffeeIcon',
                      variant: 'danger',
                      text: this.error,
                    },
                  })
      
      } 
    },

     async isUsernameUnique() {
      try {
        const response = await authentication.isUniqueEmail ({
         email: this.email,
     
        })
        return false;
      } catch (err) {
        if (err.response.status === 404) {
          return true;
        }
      }
    }

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
