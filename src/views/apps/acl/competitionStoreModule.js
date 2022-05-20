import axios from '@axios'
import authentication from '@/services/authentication.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCompetitions(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .allCompetitions()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
 
    fetchCompetitionById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findCompetitionById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },


  },
}
