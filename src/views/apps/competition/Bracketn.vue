<template>



  <article class="bracket">

    <article
      v-for="(round, roundIndex) of rounds"
      :key="roundIndex"
      class="round">
           <p>{{roundIndex}}</p>


    <article
      v-for="(m, mIndex) of round.Matches"
      :key="mIndex"
      class="round">

<div>{{m.player1}}</div>   
<div>{{m.player2}}</div> 
<button @click="appel(m.matchIndex,round.nb_matches,round.id,round.roundIndex)">change</button>  

 </article>
    </article>

  </article>
</template>

<script>
import io from "socket.io-client"
import {
BButton
} from 'bootstrap-vue'


export default {
  components: {BButton },
  
  data() {
    return {
      data:[{num:"12",
        loser:"ok"}],
    socket : io('localhost:3001'),
    rounds:[]
    
    }

},
created(){
 this.socket.emit('matches' )
  this.socket.on("matchesRep", data =>{

data.rounds.forEach(element => {
  this.rounds.push(element),
  console.log(this.rounds)


});        
          }) 
  
},
methods : {
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
  appel(m,nb,roundId,roundIndex){
    console.log(m,nb,roundId,roundIndex)

 this.socket.emit('update_score',{m,nb,s1:"1",s2:"0",roundId,roundIndex})
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
// Colors
$background-color: #111;
$border-active-color: white;
$border-inactive-color: #666;
$bracket-branch-color: #333;
$disabled-color: #666;
$font-color: white;
$input-placeholder-color: #666;
$offline-color: red;
$online-color: green;
$primary-color: gold;
$share-modal-overlay-color: rgba(0, 0, 0, 0.8);
$side-background-color: #181818;
$side-placeholder-color: #333;
$side-to-be-decided-color: #666;
$status-bar-color: #181818;
$tab-active-color: #333;

// Font Size
$font-size: 1.2rem;
$form-element-font-size: 1.3rem;
$label-font-size: 1rem;
$navigation-item-font-size: 1.2rem;
$title-font-size: 5rem;
$tooltip-font-size: 1rem;

// Widths & Heights
$bracket-branch-line-width: 1.5px;
$score_p1-width: 40rem;
$horn-width: 2.5rem;
$input-width: 20rem;
$label-line-height: 1.2;
$match-width: 8rem;
$score-input-width: 3rem;
$status-bar-height: 3rem;
$winner-title-line-height: 1.2;

// Paddings & Margins
$body-padding: 1rem;
$button-padding: 1rem;
$client-icon-margin: 0.5rem;
$score_p1-navigation-list-margin: 1.3rem;
$input-padding: 0.5rem;
$label-bottom-margin: 0.5rem;
$list-item-margin: 1rem;
$match-margin: 0.5rem;
$modal-padding: 1rem;
$organizer-margin: 0.5rem;
$round-margin: 1rem;
$section-margin: 2.5rem;
$side-margin: 0.25rem;
$side-padding: 0.25rem;
$table-cell-padding: 1rem;
$tooltip-padding: 0.5em;
$status-bar-button-margin: 0.5rem;

// Breakpoints
$mobile-breakpoint: 35em;

// Misc
$title-size-modifier: 1.5;
$tooltip-border-radius: 0.5em;
$transition-duration: 0.3s;
$winner-brightness: 1.2;

.bracket {
  display: inline-flex;
  margin: $section-margin 0;
  position: relative;
  text-align: left;
}

.round {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 $round-margin;
}

.match {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: $match-margin;
  margin-bottom: $match-margin;
  width: $match-width;
}

@media screen and (min-width: $mobile-breakpoint) {
  .round {
    margin: 0 (2 * $round-margin);
  }

  .match {
    width: $match-width * 1.5;
  }
}
</style>
