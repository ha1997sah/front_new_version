<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Forgot Password v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <!-- logo -->
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">
            Vuexy
          </h2>
        </b-link>
        <b-card-title class="mb-1">
          Mot de passe oublié? 🔒
        </b-card-title>
        <b-card-text class="mb-2">
Entrez votre email et nous vous enverrons des instructions pour réinitialiser votre mot de passe        </b-card-text>

        <!-- form -->
        <validation-observer ref="simpleRules">
          <b-form
            class="auth-forgot-password-form mt-2"
          >
            <!-- email -->
            <b-form-group
              label="Email"
              label-for="forgot-password-email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="forgot-password-email"
                  v-model="email"
                  :state="errors.length > 0 ? false:null"
                  name="email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              block
              type="button"
              @click="sendEmail"
            >
            Envoyer le lien de réinitialisation            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <b-link :to="{name:'auth-login-v1'}">
            <feather-icon icon="ChevronLeftIcon" /> Retour au connexion
          </b-link>
        </b-card-text>

      </b-card>
    <!-- /Forgot Password v1 -->
    </div>
  </div>
</template>


<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BAlert, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { VueRecaptcha } from 'vue-recaptcha';
import {mapState} from 'vuex'
import authentication from '@/services/authentication.js'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'


export default {
  components: {
    VuexyLogo,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    BAlert,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {

      email: '',
      error: null,

      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
      ...mapState([
      'isUserLoggedIn',
      'user',
    ]),
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
	async sendEmail () {
      try {
       const response = await authentication.resetPassword ({
       email: this.email,

        })
           this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'titre',
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text:'Merci de verifier votre email' ,
                    },
                  })
      } catch (error) {
        this.error = error.response.data.error
        
           this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'titre',
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text:this.error ,
                    },
                  })
      }
    },

   }, }
</script>
<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
