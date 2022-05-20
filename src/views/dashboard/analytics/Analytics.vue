<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col
        lg="12"
        md="12"
      >
        <analytics-congratulation :data="data.congratulations" />
      </b-col>
  
      
    </b-row>

<b-row class="match-height">
      <b-col lg="6">
        <b-row class="match-height">
          <!-- Bar Chart - Orders -->
          <b-col
            lg="4"
            md="3"
            cols="6"
          >
 
        <statistic-card-vertical
          color="primary"
          icon="ApertureIcon"
          :statistic="stData.nbClub[0].nbClub"
          statistic-title="Clubs"
        />
          </b-col>
          <!--/ Bar Chart - Orders -->
          <b-col
            lg="4"
            md="3"
            cols="6"
          >
            <statistic-card-vertical
          color="info"
          icon="GlobeIcon"
          :statistic="stData.nbFed[0].nbFed"
          statistic-title="Fedérations"
        />
          </b-col>
          <b-col
            lg="4"
            md="3"
            cols="6"
          >
            <statistic-card-vertical
          color="warning"
          icon="DribbbleIcon"
          :statistic="stData.matches[0].nbMatches"
          statistic-title="Matches"
        />
          </b-col>
          <b-col
            lg="8"
            md="6"
          >
            <ecommerce-earnings-chart :data="earningsChart" />
          </b-col>
             <b-col
            lg="4"
            md="3"
            cols="6"
          >
            <statistic-card-vertical
          color="success"
          icon="AwardIcon"
          :statistic="stData.nbFed[0].nbFed"
          statistic-title="Gagnantes/Gagnants"
        />
          </b-col>
        </b-row>
      </b-col>
       
      <!-- Revenue Report Card -->
        <b-col lg="6">
        <analytics-support-tracker :data="stData" />
      </b-col>
      <!--/ Revenue Report Card -->
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { kFormatter } from '@core/utils/filter'
import AnalyticsCongratulation from './AnalyticsCongratulation.vue'
import AnalyticsAvgSessions from './AnalyticsAvgSessions.vue'
import AnalyticsSupportTracker from './AnalyticsSupportTracker.vue'
import AnalyticsTimeline from './AnalyticsTimeline.vue'
import AnalyticsSalesRadarChart from './AnalyticsSalesRadarChart.vue'
import AnalyticsAppDesign from './AnalyticsAppDesign.vue'
import EcommerceOrderChart from '../ecommerce/EcommerceOrderChart.vue'
import EcommerceProfitChart from '../ecommerce/EcommerceProfitChart.vue'
import EcommerceEarningsChart from '../ecommerce/EcommerceEarningsChart.vue'
import authentication from '@/services/authentication.js'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'

export default {
  components: {
    BRow,
    BCol,
    EcommerceOrderChart,
    EcommerceProfitChart,
    EcommerceEarningsChart,
    AnalyticsCongratulation,
    AnalyticsAvgSessions,
    StatisticCardWithAreaChart,
    AnalyticsSupportTracker,
    AnalyticsTimeline,
    AnalyticsSalesRadarChart,
    AnalyticsAppDesign,
    StatisticCardVertical
  },
  data() {
    return {
      data: {},
      data2: {},
      stData: [],
      ev:[],
      events:[1,2],
      earningsChart: {
      series: [30, 30],
  },
      subscribersGained: {
      series: [
      {
        name: 'Subscribers',
        data:[4,10,100]
      },
    ],
    analyticsData: {
      subscribers: "",
    },
  },


  }
  
  },
  created() {
    authentication.stat().then(response => {this.stData=JSON.parse(JSON.stringify(response.data)),
    this.stData.eventsPerYear.forEach(element => {
      
      this.ev.push(element.count)
      
    }),
    this.subscribersGained.series[0].data.push(this.ev),
    this.subscribersGained.analyticsData.subscribers=this.stData.nbEventTotal[0].nbEv
    this.subscribersGained.series[0].data=JSON.parse(JSON.stringify(this.subscribersGained.series[0].data)),
    console.log(this.subscribersGained.series[0].data)
   

    }),
      this.$http.get('/analytics/data')
      .then(response => { this.data = response.data })
  },
  methods: {
    kFormatter,
  },
}
</script>
