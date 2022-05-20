<template>
<div>
      <app-collapse accordion
      v-for="(data,index) in JSON.parse(JSON.stringify(catUsers))"
        :key="index">

    <app-collapse-item :title="data.nameCat">
<b-row>
  <b-col lg="6">  
    <draggable
      class="list-group list-group-flush cursor-move"
      tag="ul"
     :v-model="JSON.parse(JSON.stringify(catUsers))"

    >
      <transition-group
        type="transition"
        name="flip-list"
      >
        <b-list-group-item
          v-for="user in data.users"
        :key="user.id"
          tag="li"
        >  

          <div class="d-flex">
            <div class="ml-25">
              <b-card-text class="font-weight-bold mb-0">
  {{user.name}}
              </b-card-text>
            </div>
          </div>
        </b-list-group-item>
      </transition-group>
    </draggable>

    <!-- code  -->

  </b-col>
      <b-col lg="2"> 
       </b-col>
    <b-col lg="4"> 
      <b-row>
      <div>
        <h4 class="text-uppercase mb-0">
          Tirage au sort
         </h4>
        <small>Choissiez les options</small>
      </div>
     
    </b-row>
    <!-- Algorithm options-->
     <b-row>
       <div>
    <b-form-checkbox
      v-model="algo"
      value="1"
      class="custom-control-danger"
      checked
    >
      Single Elimination
    </b-form-checkbox>
    <b-form-checkbox
      v-model="algo"
      value="2"
      class="custom-control-warning"
    >
      Double Elimination
    </b-form-checkbox>
    </div>
        </b-row>

        <!-- active seed-->
     <b-row>
       <div>
      <b-card-text class="mb-0">
        Seedez les jouoeurs
      </b-card-text>

      <b-form-checkbox
        @change="open"
        v-model="checked"
        class="custom-control-primary"
        name="check-button"
        switch
      />
  
    </div>
    </b-row>
 <b-row>
       <div>
       <b-button 
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      v-b-toggle.sidebar-right
      variant="outline-primary"
      @click="tirage(data.users,data.id)"
    >
    TIRAGE
    </b-button>
     <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      v-b-toggle.sidebar-right
      variant="outline-primary"
      @click="seeBracket(data.users,data.id)"
    >
    Voir le tirage
    </b-button>
    </div>
    </b-row>
    </b-col>

  </b-row>
    
     

    </app-collapse-item>

  </app-collapse>
  
</div>

</template>


<script>

import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import ECommerceProductDetailsItemFeatures from './ECommerceProductDetailsItemFeatures.vue'
import ECommerceProductDetailsRelatedProducts from './ECommerceProductDetailsRelatedProducts.vue'
import {
 BPopover,VBPopover, BCard, BCardBody, BRow, BCol, BImg, BCardText, BLink, BButton, BDropdown, BDropdownItem, BAlert, BListGroupItem,
BAvatar, BMedia,BMediaBody,BCardGroup,BCardTitle, BSidebar, VBToggle,BListGroup,BFormCheckbox
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import participant from '../user/users-list/Participant.vue'
import authentication from '@/services/authentication.js'

import router from '@/router'

import draggable from 'vuedraggable'
import Prism from 'vue-prism-component'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
export default {
  directives: {
    Ripple,
        'b-toggle': VBToggle,
        'b-popover': VBPopover,

  },
  components: {
    // BSV
    BPopover,
    BFormCheckbox,
    BListGroup,
    BSidebar, VBToggle,
     AppCollapse,
    AppCollapseItem,
    BCardTitle,
    BCardGroup,
    BCard,
    participant,
    BCardBody,
    BRow,
    BCol,
    BImg,
    BCardText,
    BLink,
    BButton,
    BDropdown,
    BDropdownItem,
    BAlert,
    BAvatar, BMedia,BMediaBody,
        ECommerceProductDetailsItemFeatures,
    ECommerceProductDetailsRelatedProducts,
        draggable,
    BListGroupItem,
    Prism,
  },
 
    data() {
    return {
      img: require('@/assets/images/karate.jpg'),
      categories:[],
      users:[],
      catUsers:[],
      algo:"",
      checked:false,
      show:false,

    
    }
  },
  created(){ 
    authentication.hasRound({catId:"2"}).then(response=>{
      this.show=response.data.show
      console.log(this.show)
    })
   authentication.allCategoriesByEvent(router.currentRoute.params.id).then(response=>{
   this.categories=response.data.categories,
   this.users=response.data.users,
    this.categories.forEach(element => {
    this.catUsers.push({id:element.id,nameCat:element.nameCat,users:this.users.filter(user => user.Inscription.catId== element.id)})
      
    },)
 
    
             

 })},
    methods: {
    
      open(){ 
          this.$swal({
        title: 'Info!',
        text: 'You clicked the button!',
        icon: 'info',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      },
      tirage(players,catId){
        console.log(catId)
        console.log(players),
        console.log("algo",this.algo)
            console.log("checked",this.checked)

         authentication.generate({players:players,algo:this.algo,seed:this.checked,catId:catId}).then(response=>{
            this.$router.push({ path: `/apps/competitions/bracket/${catId}`})
        }) 

      },
      seeBracket(players,catId){
        console.log(players),
           this.$router.push( { path: `/apps/competitions/bracket/${catId}`})
      },
      pushArray(user){
        this.catUsers.push(user)
      },
      test2(){console.log("ok")}
}}
    </script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce-details.scss";
.list-group-item {
  transition: all 1s
}
.customizer-section {
  padding: 1.5rem;
    border-bottom: 1px solid #ebe9f1;

  .dark-layout & {
    border-color: $theme-dark-border-color;
  }

  #skin-radio-group ::v-deep {
    .custom-control-inline {
      margin-right: 0.7rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;;
    &:last-of-type {
    margin-bottom: 0;
    }
    ::v-deep legend {
      font-weight: 500;
    }
  }
}

.mark-active {
  box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
}

.ps-customizer-area {
  height: calc(100% - 83px)
}
</style>
