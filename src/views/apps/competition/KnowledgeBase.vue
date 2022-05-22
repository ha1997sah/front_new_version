<template>
  <div>
    <!-- search input -->
    <section id="knowledge-base-search">
      <b-card
        no-body
        class="knowledge-base-bg text-center"
        :style="{backgroundImage: `url(${require('@/assets/images/karate.jpg')})`}"
      >
        <b-card-body class="card-body">
          <h2 class="text-primary">
            Dedicated Source Used on Website
          </h2>
          <b-card-text class="mb-2">
            <span>Popular searches: </span>
            <span class="font-weight-bolder">Sales automation, Email marketing</span>
          </b-card-text>

          <!-- form -->
          <b-form class="kb-search-input">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                id="searchbar"
                placeholder="Ask a question...."
              />
            </b-input-group>
          </b-form>
          <!-- form -->
        </b-card-body>
      </b-card>
    </section>
    <!--/ search input -->

    <section id="knowledge-base-content">

      <!-- content -->
      <b-row class="kb-search-content-info match-height">
        <b-col
          v-for="blog in blogList"

          :key="blog.id"
          md="4"
          sm="6"
          class="kb-search-content"
        >
          <b-card
            class="text-center cursor-pointer"
            :img-src="require('@/assets/images/karate.jpg')"
            :img-alt="blog.image.slice(5)"
            img-top

           @click="$router.push({ name:'apps-competition-detail',params: { id: data.item.id } })"

          >
            <h4>{{ blog.name }}</h4>
            <b-card-text class="mt-1">
              {{ blog.name }}
            </b-card-text>
          </b-card>
        </b-col>
    <!--     <b-col
          v-show="!filteredKB.length"
          cols="12"
          class="text-center"
        >
          <h4 class="mt-4">
            Search result not found!!
          </h4>
        </b-col> -->
      </b-row>
    </section>
  </div>
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
@import '@core/scss/vue/pages/page-knowledge-base.scss';
</style>
