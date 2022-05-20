import axios from '@axios'
import authentication from '@/services/authentication.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchClubs(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .allClubs()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchClubsUnderFed(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .clubUnderFed(router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
 
    fetchClubsUnderFeds(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .clubUnderFeds(router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
 

    fetchClubById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findClubById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
 
    addClub(ctx, clubData) {
      return new Promise((resolve, reject) => {
        authentication.addClub(clubData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editClub(ctx, clubData) {
      return new Promise((resolve, reject) => {
        authentication
          .editClub( clubData,router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
    deleteClub(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .deleteClub(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },

  },
}
