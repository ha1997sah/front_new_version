
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
            :text="avatarText(catData.nameCat)"
            :variant="`light-${resolveUserRoleVariant(catData.nameCat)}`"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ catData.nameCat }}
              </h4>
              <span class="card-text">{{ catData.type }} </span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'apps-categories-edit', params: { id: catData.id } }"
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
              <span class="font-weight-bold">Titre</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ catData.nameCat }}
            </td>
          </tr>
            <tr>
            <th class="pb-50">
              <feather-icon
                icon="GlobeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Type</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ catData.type }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="MessageSquareIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Sexe</span>
            </th>
            <td class="pb-50">
              {{ catData.sexe }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Age</span>
            </th>
            <td>
              {{ catData.age }}
            </td>
          </tr>
            <tr>
            <th>
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Poids</span>
            </th>
            <td>
              {{ catData.weight }}
            </td>
          </tr>
          <tr>
             <th>
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Date</span>
            </th>
            <td>
             <b-media no-body>
             
              <b-media-body>
                <small>
                  <b-link class="text-body">           
                       {{ new Date(catData.start).getDate()+'-'+new Date(catData.start).getMonth()+'-'+new Date(catData.start).getFullYear()}}
                       </b-link>
                </small>
                <span class="text-muted ml-75 mr-50">|</span>
                <small class="text-muted">
                   <b-link class="text-body">           
                       {{ new Date(catData.end).getDate()+'-'+new Date(catData.end).getMonth()+'-'+new Date(catData.end).getFullYear()}}
                </b-link>
                </small>
              </b-media-body>
            </b-media>
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
  BCard, BButton, BAvatar, BRow, BCol,BMedia,BMediaBody, BCardBody, BImg, BCardText, BLink, BDropdown, BDropdownItem, BAlert,

} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import useCompetitionsList from './useCompetitionsList'
export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,BMedia,BMediaBody,BCardBody, BImg, BCardText, BLink, BDropdown, BDropdownItem, BAlert,

  },
  props: {
    catData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { resolveUserRoleVariant,handleOk } = useCompetitionsList()
  
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