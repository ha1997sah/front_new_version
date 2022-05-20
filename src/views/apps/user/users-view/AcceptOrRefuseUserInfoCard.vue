
<template>
  <b-card>

    <b-row>

      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :text="avatarText(userData.fullName)"
            :variant="`light-${resolveUserRoleVariant(userData.fullName)}`"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ userData.name }}
              </h4>
              <span class="card-text">{{ userData.name }} {{ userData.lastname }} </span>
            </div>
          
          </div>
        </div>
          

        <!-- User Stats -->
       
        <div class="d-flex align-items-center mt-2">
        <b-button
          variant="primary"
        @click="acceptRegister"
        >
         
          <span class="d-none d-sm-inline">Accepter</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
                  @click="refuseRegister"

        >
          <span class="d-none d-sm-inline">Supprimer</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Nom</span>
            </th>
            <td class="pb-50">
              {{ userData.lastname }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Prénom</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.name }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Role</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.position }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="FlagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Email</span>
            </th>
            <td class="pb-50">
              {{ userData.email }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Contact</span>
            </th>
            <td>
              {{ userData.phone }}
            </td>
          </tr>
        </table>
      </b-col>
    
    </b-row>
                   
    <b-modal id="modal-1" title="BootstrapVue"
     
          @ok="handleOk">
             <p class="my-4">Cette action ne peut pas être annulée!</p>
  
             </b-modal>
  </b-card>
</template>

<script>
import {
  BCard, BAvatar, BRow, BCol,BCardText, BButton 
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import useUsersList from '../users-list/useUsersList'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import pdf from 'vue-pdf'

import router from '@/router'


export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,BCardCode, BCardText,pdf,
  },
  data(){
    return {    
      pdfFile:"http://localhost:3001/2022-03-16T12-59-25.180Zcertificate.pdf"} 
 },
   directives: {
    Ripple,
  },
  
  methods: {
    openPdf () {
   window.open("http://localhost:3001/2022-03-16T12-59-25.180Zcertificate.pdf");
},
        refuseRegister() {
      this.$swal({
        title: 'Attention!',
        text: ' Attention! Cette action ne peut pas être annulée!',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-primary',
        },
        buttonsStyling: false,
         showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Oui! Confirmer!',
}).then((result) => {
  if (result.isConfirmed) {
       store.dispatch('app-user/refuseRegister',router.currentRoute.params.id)
        .then(() => {
          response => { console.log("okkk")}
         this.$swal({
        title: '!',
        text: ' Votre action est réussi!',
        icon: 'success',}
    )
          

        }).catch(error=>console.log(error))
 
  }
      })
    },
       acceptRegister() {
      this.$swal({
        title: 'Attention!',
        text: '  Attention! Cette action ne peut pas être annulée!',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-primary',

        },
        buttonsStyling: false,
         showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Oui, Accepter !',
}).then((result) => {
  if (result.isConfirmed) {
       store.dispatch('app-user/acceptRegister',router.currentRoute.params.id)
        .then(() => {
          response => { console.log("okkk")}
         this.$swal({
        title: 'Utilisateur ajouté!',
        text: ' Votre action est réusi!',
        icon: 'success',}
    )
          

        }).catch(error=>console.log(error))
 
  }
      })
    },
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { resolveUserRoleVariant,handleOk } = useUsersList()
  
    return {
      avatarText,
      resolveUserRoleVariant,
      handleOk,
    }
  },
}
</script>

<style>

</style>
