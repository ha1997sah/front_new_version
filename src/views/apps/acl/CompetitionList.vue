<template>
  <content-with-sidebar class="blog-wrapper">

    <!-- blogs -->
    <b-row class="blog-list-wrapper">
      <b-col
        v-for="blog in blogList"
        :key="`http://localhost:3001/${blog.image}`"
        md="6"
      >
        <b-card
          tag="article"
          no-body
        >
          <b-link :to="{ name: 'apps-competition-detail', params: { id: blog.id } }">
            <b-img
              :src="`http://localhost:3001/${blog.image}`"


              class="card-img-top"
            />
          </b-link>
          <b-card-body>
            <b-card-title>
              <b-link
                :to="{ name: 'apps-competition-detail', params: { id: blog.id } }"
                class="blog-title-truncate text-body-heading"
              >
                {{ blog.name }}
              </b-link>
            </b-card-title>
            <b-media no-body>
             
              <b-media-body>
                <small>
                  <b-link class="text-body">           
                       {{ new Date(blog.start).getDate()+'-'+new Date(blog.start).getMonth()+'-'+new Date(blog.start).getFullYear()}}
                       </b-link>
                </small>
                <span class="text-muted ml-75 mr-50">|</span>
                <small class="text-muted">
                   <b-link class="text-body">           
                       {{ new Date(blog.end).getDate()+'-'+new Date(blog.end).getMonth()+'-'+new Date(blog.end).getFullYear()}}
                </b-link>
                </small>
              </b-media-body>
            </b-media>
          
            <b-card-text class="blog-content-truncate">
              Deadline:  {{ new Date(blog.deadline).getDate()+'-'+new Date(blog.deadline).getMonth()+'-'+new Date(blog.deadline).getFullYear()}}
            </b-card-text>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
               <b-button  :disabled="new Date()>new Date(blog.deadline)"
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-modal.modal-select2
        variant="outline-primary"
        @click="elig(blog.id )"
      >
       Participer
      </b-button>
      
          
              <b-link
                :to="{ name: 'apps-competition-detail', params: { id: blog.id } }"
                class="font-weight-bold"
              >
                Voir plus
              </b-link>
            </div>
        
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12">
        <!-- pagination -->
        <div class="my-2">
          <b-pagination
            v-model="currentPage"
            align="center"
            :total-rows="rows"
            first-number
            last-number
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>
        </div>
      </b-col>
    </b-row>

    <!--/ blogs -->

    <!-- sidebar -->
    <div
      slot="sidebar"
      class="blog-sidebar py-2 py-lg-0"
    >
      <!-- input search -->
      <b-form-group class="blog-search">
        <b-input-group class="input-group-merge">
          <b-form-input
            id="search-input"
                v-model="query"
            placeholder="Rechercher"
           @keyup="search"

          />
          <b-input-group-append
            class="cursor-pointer"
            is-text
          >
            <feather-icon
              icon="SearchIcon"
            />
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <!--/ input search -->

      <div class="blog-recent-posts mt-3">
        <h6 class="section-label mb-75">
          Nouveaux Compétitions
        </h6>
        <b-media
          v-for="(recentpost,index) in latestComp"
          :key="`http://localhost:3001/${recentpost.image}`"
          no-body
          :class="index? 'mt-2':''"
        >
          <b-media-aside class="mr-2">
            <b-link>
              <b-img
                :src="`http://localhost:3001/${recentpost.image}`"
                :alt="`http://localhost:3001/${recentpost.image}`.slice(6)"
                width="100"
                rounded
                height="70"
              />
            </b-link>
          </b-media-aside>
          <b-media-body>
            <h6 class="blog-recent-post-title">
              <b-link class="text-body-heading">
                {{ recentpost.name }}
              </b-link>
            </h6>
            <span class="text-muted mb-0">
              {{ new Date(recentpost.start).getDate()+'-'+new Date(recentpost.start).getMonth()+'-'+new Date(recentpost.start).getFullYear()}}
            </span>
          </b-media-body>
        </b-media>
      </div>
      <!-- categories -->
   
      <!--/ categories -->
    </div>
    <!--/ sidebar -->
    <div>
      <b-modal   v-if="show"
      id="modal-select2"
      title="Votre informations"
      cancel-variant="outline-secondary"
      ok-title="Ok"
    >
    <!-- second (v-if) -->
       <div >
         <p>Vos informations ne correspondent pas à l’exigences de cette compétition</p>
      </div>

    </b-modal>
      
         <b-modal v-if="!show" 
      id="modal-select2"
      title="Votre informations"
      cancel-variant="outline-secondary"
      ok-title="Accept"
      @ok="inscrit"
    >
      <b-form>
        <b-row>
     <b-col md="6">
        <b-form-group>
          <label for="taille">Taille:</label>
          <b-form-input
            id="taille"
            type="text"
            placeholder="Taille"
            v-model="userData.height"

          />
        </b-form-group>
        </b-col>
     <b-col md="6">
          <b-form-group>
          <label for="Poids">Poids:</label>
          <b-form-input
            id="poids"
            type="text"
            placeholder="Poids"
            v-model="userData.weight"

          />
        </b-form-group>
        </b-col>
        </b-row>
           <b-row>
     <b-col md="6">
        <b-form-group>
          <label for="belt">Ceinture:</label>
          <b-form-input
            id="belt"
            type="text"
            placeholder="Ceinture"
            v-model="userData.belt"

          />
        </b-form-group>
        </b-col>
     <b-col md="6">
          <b-form-group>
          <label for="club">Club:</label>
          <b-form-input
            id="club"
            type="text"
            placeholder="Club"
            v-model="userData.Club.name"

          />
        </b-form-group>
        </b-col>
        </b-row>
        
  
        
      </b-form>
     
    <!-- second (v-if) -->
      
    </b-modal>
    </div>
     <b-modal
      id="modal-multi-2"
      title="Opération réussi"
    >
      <b-card-text class="my-2">
        Confirmation inscription
      </b-card-text>
     
     
    </b-modal>
  </content-with-sidebar>
</template>

<script>
import {
  BRow, BCol,BButton,BModal,VBModal, BCard,BForm, BFormInput, BCardText, BCardTitle, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BCardBody, BLink, BBadge, BFormGroup, BInputGroup, BInputGroupAppend, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

import { kFormatter } from '@core/utils/filter'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'
import Ripple from 'vue-ripple-directive'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import authentication from '@/services/authentication.js'


export default {
  components: {
    useToast,
    BModal,
    vSelect,
    VBModal,
    BForm,
    BButton,
    BRow,
    BCol,
    BCard,
    BFormInput,
    BCardText,
    BCardBody,
    BCardTitle,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BLink,
    BBadge,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BPagination,
    ContentWithSidebar,
  },
    directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      search_query: '',
      blogList: [],
      blogSidebar: {},
      currentPage: 1,
      perPage: 1,
      rows: 140,
      img: require('@/assets/images/karate.jpg'),
      userData:null,
      latestComp:null,
      query:'',
      show:true,
      idComp:'',
      allowParticip:true

    }
  },
  created() {
      
          authentication
          .allCompetitions()
          .then(response =>  { 
                this.blogList = response.data.competitions ,conole.log(response.data)
            })
          .catch(error => error.message),

          authentication.findUserById(JSON.parse(localStorage.getItem("userData")).id).then(response => { this.userData = response.data.user,
          console.log(this.userData)

          }),

             authentication.latestCompetitions().then(response =>{
             this.latestComp= response.data.competitions

               })
     
 
    this.$http.get('/blog/list/data/sidebar').then(res => { this.blogSidebar = res.data })
  },
  methods: {
    kFormatter,
    tagsColor(tag) {
      if (tag === 'Quote') return 'light-info'
      if (tag === 'Gaming') return 'light-danger'
      if (tag === 'Fashion') return 'light-primary'
      if (tag === 'Video') return 'light-warning'
      if (tag === 'Food') return 'light-success'
      return 'light-primary'
    },

           elig(info){
             this.idComp=info
          authentication.elig({
            compId:this.idComp,
            userId:JSON.parse(localStorage.getItem("userData")).id
          }).then(response=>{
             if(response.status===201)
            {this.show=true}
           if(response.status===200) {
              this.show=false}
             console.log(this.show)

 })
    },
         testDate(deadline){
           const today = new Date()
           console.log(today)
           if(today<new Date(deadline))
           {
             this.allowParticip=true
           }
           else{this.allowParticip=false

           }
          
    }
    ,
    inscrit(){
 authentication.inscrit({
            compId:this.idComp,
            userId:JSON.parse(localStorage.getItem("userData")).id
          }).then(response=>{
               this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Participation Ok',
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: 'Votre demande d\'inscription a été bien enregistrer nous traitons votre demande dans le bref délais',
                    },
                  })

 })
    } ,
  
  
  search () {

      authentication
          .allCompetitions()
          .then(response =>{

             if (this.query) {
           this.blogList = response.data.competitions.filter(blogList =>
              blogList.name.toLowerCase().includes(this.query.toLowerCase()))
          } else {
           this.blogList =response.data.competitions
          }
 })
 
 
 
 }

    },

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-blog.scss';
</style>
