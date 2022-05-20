import axios from '@axios'
import authentication from '@/services/authentication.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCategories(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
         .allCategories()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCategory(ctx, clubData) {
      return new Promise((resolve, reject) => {
        authentication.addCategory(clubData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }, 
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
           
          .findCometitionById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCategoryById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findCategoryById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCatById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findCatById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
   addCompetition(ctx, clubData) {
      return new Promise((resolve, reject) => {
        authentication.addCompetition(clubData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }, 
    editCompetition(ctx, clubData) {
      return new Promise((resolve, reject) => {
        authentication
          .editCompetition( clubData,router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    }, 
    deleteCompetition(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .deleteCompetition(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    }, 

  },
}
