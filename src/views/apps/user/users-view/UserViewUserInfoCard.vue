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
            <div class="d-flex flex-wrap">
              
            
            </div>
          </div>
        </div>

        <!-- User Stats -->
        <div class="d-flex align-items-center mt-2">
            <b-button
                :to="{ name: 'apps-users-edit', params: { id: userData.id } }"
                variant="primary"
              >
                Modifier
              </b-button>
               <b-button
                variant="outline-danger"
                class="ml-1"
                v-b-modal.modal-1
              >
                Supprimer
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
             <tr>
            <th>
              <feather-icon
                icon="GlobeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Federation</span>
            </th>
            <td>
              {{ userFed.name}}
            </td>
          </tr>
             <tr>
            <th>
              <feather-icon
                icon="OctagonIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Club</span>
            </th>
            <td>
              {{ userClub.name}}
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
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
      userClub: {
      type: Object,
      required: true,
    },
      userFed: {
      type: Object,
      required: true,
    },
  
  },
 data() {
    return {
    }
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
