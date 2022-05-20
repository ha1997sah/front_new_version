<template>
  <b-card title="Records">
    <b-row>
<b-col
cols="12"
        xl="6">  
      <app-timeline-item
      v-for="(record) in userData" :key="record.id">
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Date</h6>
        </div>
        <p>
    {{ new Date(record.recordDate).getDate()+'-'+new Date(record.recordDate).getMonth()+'-'+new Date(record.recordDate).getFullYear()}}
</p>
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Titre</h6>
        </div>
        <p>{{record.title}}</p>
      
      </app-timeline-item>
     
      </b-col>
   
       </b-row>

  </b-card>
</template>
<script>
import {
  BCard, BImg, BMedia, BAvatar,BCol,BRow
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

export default {
  components: {
    BCard,
    BCol,BRow,
    BImg,
    BMedia,
    BAvatar,
    AppTimeline,
    AppTimelineItem,
  },
     props: {
    userData: {
      type: Array,
      required: true,
    },
    
  },
  methods:{
         openPdf () {
   window.open(`http://localhost:3001/${userData.image}`);
}
  }
}
</script>

<style>

</style>
