import authentication from '@/services/authentication.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchFederations(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .allFederations()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchFederationById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findFederationById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
 
    addFederation(ctx, FederationData) {
      return new Promise((resolve, reject) => {
        authentication.addFederation(FederationData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editFederation(ctx, FederationData) {
      return new Promise((resolve, reject) => {
        authentication
          .editFederation( FederationData,router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
    deleteFederation(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .deleteFederation(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },

    },
}
