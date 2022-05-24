import axios from '@axios'
import authentication from '@/services/authentication.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsersTest(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .allUsers()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    
    uersWithMatricule(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .usersWithMatricule(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchAthletes(ctx, queryParams) {
    
      return new Promise((resolve, reject) => {
        authentication
          .allAthletes()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchAthletesBysexe(ctx,sexe) {
      return new Promise((resolve, reject) => {
        authentication
          .athletesBySexe({sexe:sexe})
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchAthletesByLevel(ctx,level) {
      return new Promise((resolve, reject) => {
        authentication.athletesByLevel({level:level})
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUsersUnderClub(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .usersUnderClub({ClubId:router.currentRoute.params.id} )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUsersClub(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .usersUnderClub({ClubId:id} )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUsersUnderFed(ctx,FederationId) {
      return new Promise((resolve, reject) => {
        authentication
          .usersUnderFed({FederationId:FederationId} )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/user/users', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUserById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findUserById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchPendingRequests(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .allPendingRequests()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/user/users/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addAdmin(ctx, userData) {
      return new Promise((resolve, reject) => {
        authentication.addAdmin(userData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        authentication
          .editUser( userData,router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
    deleteUser(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .deleteUser(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
    acceptRegister(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .acceptRegister(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },

    refuseRegister(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .refuseRegister(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
  },
}
