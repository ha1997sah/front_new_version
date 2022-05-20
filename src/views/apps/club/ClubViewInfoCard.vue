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
            :text="avatarText(clubData.name)"
            :variant="`light-${resolveUserRoleVariant(clubData.name)}`"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ clubData.name }}
              </h4>
              <span class="card-text">{{ clubData.country }} </span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                variant="outline-danger"
                class="ml-1"
                v-b-modal.modal-1
              >
                Supprimer
              </b-button>
            </div>
          </div>
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
              <span class="font-weight-bold">Responsable</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ clubData.managerfullName }}
            </td>
          </tr>
            <tr>
            <th class="pb-50">
              <feather-icon
                icon="GlobeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Adresse</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ clubData.adress }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="MessageSquareIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">E-mail</span>
            </th>
            <td class="pb-50">
              {{ clubData.email }}
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
              {{ clubData.phone }}
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
import useClubsList from './useClubsList'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    clubData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { resolveUserRoleVariant,handleOk } = useClubsList()
  
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
