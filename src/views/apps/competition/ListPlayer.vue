<template>
<div>
<div>
  <b-card no-body>
    <h1>test</h1>
   
    
<b-row>
  <b-col lg="6">  
    <draggable
      class="list-group list-group-flush cursor-move"
      tag="ul"

    >
      <transition-group
        type="transition"
        name="flip-list"
      >
        <b-list-group-item
          v-for="user in catUsers"
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
      @click="tirage(catUsers)"
    >
    TIRAGE
    </b-button>
     <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      v-b-toggle.sidebar-right
      variant="outline-primary"
      @click="seeBracket(catUsers)"
    >
    Voir le tirage
    </b-button>
    </div>
    </b-row>
    </b-col>

  </b-row>
 
  </b-card>
</div>
  
 
</div>
</template>

<script>
import io from "socket.io-client"
import Ripple from 'vue-ripple-directive'
import authentication from '@/services/authentication.js'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

import draggable from 'vuedraggable'
import Prism from 'vue-prism-component'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import {
BButton,BTabs, BTab ,BCol,BRow,BCard,BLink,BImg,BCardText,BCardImg,BCardBody,BAvatar,
 BPopover,VBPopover,  BDropdown, BDropdownItem, BAlert, BListGroupItem,
 BMedia,BMediaBody,BCardGroup,BCardTitle, BSidebar, VBToggle,BListGroup,BFormCheckbox
} from 'bootstrap-vue'

import router from '@/router'
import { find } from 'postcss-rtl/lib/affected-props'
export default {
    directives: {
    Ripple,
     'b-toggle': VBToggle,
        'b-popover': VBPopover,

  },
  components:
   { AppCollapse,
    AppCollapseItem,
     draggable,
    BListGroupItem,
    Prism,
     BButton , BTabs,BCol,BRow,BCard,BLink,BImg,BCardText,BCardImg,BCardBody,BAvatar,
    BPopover,VBPopover,  BDropdown, BDropdownItem, BAlert, BListGroupItem,
 BMedia,BMediaBody,BCardGroup,BCardTitle, BSidebar, VBToggle,BListGroup,BFormCheckbox,
    BTab},

  
  data() {
    return {
      data:[{num:"12",
        loser:"ok"}],
    socket : io('localhost:3001'),
    rounds:[],
     img: require('@/assets/images/karate.jpg'),
      categories:[],
      users:[],
      catUsers:[],
      algo:"",
      checked:false,
      show:false,
      comp:null,
      category:null,
      idCat:router.currentRoute.params.id
      
    
    }

},
created(){
   authentication.hasRound({catId:"2"}).then(response=>{
      this.show=response.data.show
    })
   authentication.findCometitionById("2").then(response=>{
   this.comp=response.data.competition,
   this.users=this.comp.Users,
   this.categories=this.comp.Categories
  this.category=this.categories.find(element => element.id == router.currentRoute.params.id)
   this.catUsers=this.users.filter(user => user.Inscription.catId== router.currentRoute.params.id)
   console.log(this.category)
   
  })

  
},
methods : {
   seeBracket(players){
        console.log(players),
           this.$router.push( { path: `/apps/competitions/bracket/${this.idCat}`})
      },
      pushArray(user){
        this.catUsers.push(user)
      },
      test2(){console.log("ok")},
   tirage(players){
        console.log(this.idCat)
        console.log(players),
        console.log("algo",this.algo)
            console.log("checked",this.checked)

         authentication.generate({players:players,algo:this.algo,seed:this.checked,catId:this.idCat}).then(response=>{
            this.$router.push({ path: `/apps/competitions/bracket/${this.idCat}`})
        }) 

      },
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
  someHandler(){console.log("hi")},
  te(){
    console.log( "ff",this.$route.params.players)
     this.socket.emit('gen',{players:this.$route.params.players})
 this.socket.on("rep",data =>{

data.rounds.forEach(element => {
  this.rounds.push(element),
  console.log(this.rounds)


});        
          })
  },
  appel(m,nb,roundId,roundIndex,s1,s2){
    console.log(m,nb,roundId,roundIndex)

 this.socket.emit('update_score',{m,nb,roundId,roundIndex,s1,s2})
 this.socket.on("updated", data =>{
     this.rounds.length = 0

data.rounds.forEach(element => {
  this.rounds.push(element),
  console.log(this.rounds)
})   
          })
  },

  test(){
      this.socket.emit('persist',this.data )
      this.socket.on("test", data =>{
       
      })
  }
}

}
</script>

     

<style lang="scss" scoped>
.checkout-form-wizard ::v-deep {
  .wizard-tab-content {
    box-shadow: none !important;
    background: transparent !important;
    padding: 0;
  }
}
@import 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,600,700&subset=latin-ext';


//
// VARIABLES
// ---------------------------
$breakpoint-xs: 24em;
$breakpoint-sm: 38em;
$breakpoint-md: 52em;
$breakpoint-lg: 72em;


//
// GENERAL RULES
// ---------------------------
* {
  &,
  &::before,
  &::after {
    box-sizing: border-box;
  }
}

html {
  font-size: 15px;
  
  @media (min-width: $breakpoint-sm) { font-size: 14px; }
  @media (min-width: $breakpoint-md) { font-size: 15px; }
  @media (min-width: $breakpoint-lg) { font-size: 16px; }
}

body {
  background-color: #f1f1f1;
  font-family: 'Work Sans', 'Helvetica Neue', Arial, sans-serif;
}
.img {
  width:80%
}
.floating {
  float:right
}
.container {
  width: 90%;
  min-width: 18em;
  margin: 20px auto;
}

h1, h2 { 
  text-align: center;
}

h1 { 
  font-size: 2rem; 
  font-weight: 700;
  margin-bottom: 0.5em;
}

h2 { 
  font-size: 1.4rem; 
  font-weight: 600;
   margin-bottom: 2em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}


//
// TOURNAMENT BRACKET
// ---------------------------
.tournament-bracket {
  display: flex;
  flex-direction: column;
  
  @media (min-width: $breakpoint-sm) {
    flex-direction: row;
  }
}

.tournament-bracket__round {
  display: block;
  margin-left: -3px;
  flex: 1;
}

.tournament-bracket__round-title {
  color: #9e9e9e;
  font-size: 0.95rem;
  font-weight: 400;
  text-align: center;
  font-style: italic;
  margin-bottom: 0.5em;
}

.tournament-bracket__list {
  display: flex;
  flex-direction: column;
  flex-flow: row wrap;
  justify-content: center;
  height: 100%;
  min-height: 100%;
  border-bottom: 1px dashed #e5e5e5;
  padding-bottom: 2em;
  margin-bottom: 2em;
  transition: padding 0.2s ease-in-out, margin 0.2s ease-in-out;
  
  @media (max-width: $breakpoint-xs) {
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
  
  @media (min-width: $breakpoint-sm) {
    margin-bottom: 0;
    padding-bottom: 0;
    border-right: 1px dashed #e5e5e5;
    border-bottom: 0;
  }
  
  .tournament-bracket__round:last-child & {
    border: 0;
  }
}

.tournament-bracket__item {
  display: flex;
  flex: 0 1 auto;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2% 0;
  width: 48%;
  transition: padding 0.2s linear;
  
  &:nth-child(odd) {
    margin-right: 2%;
  }
  
  &:nth-child(even) {
    margin-left: 2%;
  }
  
  &::after {
    transition: width 0.2s linear;
  }
  
  @media (max-width: $breakpoint-xs) {
    width: 100%;
    
    &:nth-child(odd),
    &:nth-child(even) {
      margin-left: 0;
      margin-right: 0;
    }
  }
  
  @media (min-width: $breakpoint-sm) {
    padding: 0.5em 1em;
    // flex-grow: 2;
    width: 100%;
    
    &:nth-child(odd),
    &:nth-child(even) {
      margin: 0;
    }
    
    &::after {
      position: absolute;
      right: 0;
      content: '';
      display: block;
      width: 1em;
      height: 45%;
    }

    &:nth-child(odd)::after {
      top: 50%;
      transform: translateY(-1px);
      
      .tournament-bracket--rounded & {
        border-top-right-radius: 0.6em;
      }
    }
    
    &:nth-child(even)::after {
      bottom: 50%;
      transform: translateY(1px);
      
      .tournament-bracket--rounded & {
        border-bottom-right-radius: 0.6em;
      }
    }
    .tournament-bracket__round:first-child & {
       padding-left: 0;
    }
    .tournament-bracket__round:last-child & {
       padding-right: 0;

       &::after {
         display: none;
       }
    }

    .tournament-bracket__round:nth-last-child(2) & {
      &::after {
        border-radius: 0;
        border-right: 0;
      }
    }  
  }
  
  @media (min-width: $breakpoint-lg) {
    padding: 0.5em 1.5em;
    
    &::after {
      width: 1.5em;
    }
  }
}


.tournament-bracket__match {
  display: flex;
  width: 100%;
  background-color: #ffffff;
  padding: 1em;
  border: 1px solid transparent;
  border-radius: 0.1em;
  box-shadow: 0 2px 0 0 #e5e5e5;
  outline: none; 
  cursor: pointer;
  transition: padding 0.2s ease-in-out, border 0.2s linear;
  
  &:focus {
    border-color: #2196F3;
  }
  
  &::before,
  &::after {
    transition: all 0.2s linear;
  }
  
  @media (max-width: $breakpoint-xs) {
    padding: 0.75em 0.5em;
  }
  
  @media (min-width: $breakpoint-sm) {
    &::before,
    &::after {
      position: absolute;
      left: 0;
      z-index: 1;
      content: '';
      display: block;
      width: 1em;
      height: 10%;
    }

    &::before  {
      bottom: 50%;
      transform: translate(0, 1px);
      
      .tournament-bracket--rounded & {
        border-bottom-left-radius: 0.6em;
      }
    }

    &::after  {
      top: 50%;
      transform: translate(0, -1px);
      
      .tournament-bracket--rounded & {
        border-top-left-radius: 0.6em;
      }
    }
  }
  
  @media (min-width: $breakpoint-lg) {
    &::before,
    &::after {
      width: 1.5em;
    }
    
    &::before {
      transform: translate(0, 1px);
    }
    
    &::after {
      transform: translate(0, -1px);
    }
  }
}

.tournament-bracket__round:last-child .tournament-bracket__match {
  &::before,
  &::after {
    border-left: 0;
  }
  
  &::before  {
    border-bottom-left-radius: 0;
  }
  
  &::after  {
    display: none;
  }
}

.tournament-bracket__round:first-child .tournament-bracket__match {
  &::before,
  &::after {
    display: none;
  }
}

.tournament-bracket__content {
  display: flex;
  
  &::after {
    content: ':';
    width: 1em;
    text-align: center;
    padding: 0.2em 0.1em;
    
    @media (min-width: $breakpoint-sm) {
       order: 1;
    }
  }
  
  & .tournament-bracket__team:first-child {
    width: 50%;
    order: 0;
    text-align: right;
    
    @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
      align-items: flex-end;
    }
    
    & .tournament-bracket__country {
      order: 2;
      justify-content: flex-end;
      
      @media (min-width: $breakpoint-xs) {
        order: 0;
      } 
      
      @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
        flex-direction: column-reverse;
        align-items: flex-end;
      }
    }
    
    & .tournament-bracket__score {
      order: 0;
      
      @media (min-width: $breakpoint-xs) {
         order: 2;
      }
    }
  }
  
  & .tournament-bracket__team:last-child {
    width: 50%;
    order: 2;
    text-align: left;
    
    @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
      align-items: flex-start;
    }
    
    & .tournament-bracket__country {
      @media (min-width: $breakpoint-sm) {
        justify-content: flex-start;
      }
      
      @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
        align-items: flex-start;
      }
    }
    
    .tournament-bracket__code {
      order: 1;
    }
  }
}


.tournament-bracket__table {
  width: 100%;
}

.tournament-bracket__caption {
  font-size: 0.8rem;
  color: #BDBDBD;
  font-weight: 300;
  padding-bottom: 0.75em;
}

.tournament-bracket__team {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  
  @media (min-width: $breakpoint-xs) {
    flex-direction: column-reverse;
  }
  
  @media (min-width: $breakpoint-sm) {
    flex-direction: column-reverse;
  }
}

.tournament-bracket__country {
  font-size: 0.95rem;
  display: flex;
  margin-top: 0.5em;
  align-items: center;
  
  @media (max-width: $breakpoint-xs) {
    margin-top: 0;
  }
  
  @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
    display: flex;
    flex-direction: column;
    
    .tournament-bracket__code {
      margin-top: 0.2em;
    }
  }
}

.tournament-bracket__code {
  padding: 0 0.5em;
  color: #212121;
  font-weight: 600;
  text-transform: uppercase;
  border: 0;
  text-decoration: none;
  cursor: help;
  transition: padding 0.2s ease-in-out;
  
  @media (max-width: $breakpoint-xs) {
    padding: 0 0.25em;
  }
  
  @media (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
    padding: 0;
  }
}

.tournament-bracket__score {
  display: flex;
  align-items: center;
  
  .tournament-bracket__team:first-child & {
    flex-direction: row-reverse;
    padding-left: 0.75em;
  }
  
  .tournament-bracket__team:last-child & {
    padding-right: 0.75em;
  }
}

.tournament-bracket__number {
  display: inline-block;
  padding: 0.2em 0.4em 0.2em;
  border-bottom: 0.075em solid transparent;
  font-size: 0.95rem;
  background-color: #F5F5F5;
  border-color: spin(shade(#F5F5F5, 10%), -10);
  
  .tournament-bracket__team--winner & {
    background-color: #FFF176;
    border-color: spin(shade(#FFF176, 2%), -10);
  }
}

.tournament-bracket__medal {
  padding: 0 0.5em;
}

.tournament-bracket__medal--gold {
  color: #FFD700;
}

.tournament-bracket__medal--silver {
  color: #C0C0C0;
}

.tournament-bracket__medal--bronze {
  color: #CD7F32;
}
</style>
