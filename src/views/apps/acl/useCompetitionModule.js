import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import router from '@/router'

export default function useUsersList() {
  // Use toast
  const toast = useToast()
  

  const fetchCompetitions = (ctx, callback) => {
    store
      .dispatch('app-competition/fetchCompetitions')
      .then(response => {
      console.log(response.data)

      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*



  return {
    fetchCompetitions
  }

}
