<template>
  <b-card
    v-if="data"
    no-body
  >
    <!-- title and dropdown -->
 
    <!--/ title and dropdown -->

    <b-card-body>
      <b-row>
        <b-col
          sm="2"
          class="d-flex flex-column flex-wrap text-center"
        >
          <h1 class="font-large-2 font-weight-bolder mt-2 mb-0">
            {{data.nbEventTotal[0].nbEv}}
          </h1>
          <small>Evènements
</small>
        </b-col>

        <!-- chart -->
        <b-col
          sm="10"
          class="d-flex justify-content-center"
        >

          <!-- apex chart -->
    
             <vue-apex-charts
        type="donut"
        height="200"
        class="my-1"
        :options="sessionsByDeviceDonut.chartOptions"
        :series="data.series.data"
      />

        </b-col>
        <!--/ chart -->
      </b-row>

      <!-- chart info -->
      <div class="d-flex justify-content-between">
        <div class="text-center">
          <b-card-text class="mb-50">
            Evénements passés
          </b-card-text>
          <span class="font-large-1 font-weight-bold">{{ data.pastEvent }}</span>
        </div>
        <div class="text-center">
          <b-card-text class="mb-50">
            Evénements d'aujourd'hui
          </b-card-text>
          <span class="font-large-1 font-weight-bold">{{ data.todaysEvent }}</span>
        </div>
        <div class="text-center">
          <b-card-text class="mb-50">
            Evènements à venir
          </b-card-text>
          <span class="font-large-1 font-weight-bold">{{ data.upcomingEvent }}d</span>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BDropdown, BDropdownItem, BCardBody, BRow, BCol, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
const color1="#A0BCC2"
const color2="#DAE5D0"
const color3='#FEFBE7'
export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BCardText,
    BCardBody,
    BRow,
    BCol,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
             sessionsByDeviceDonut: {
        series: [58.6, 34.9, 6.5],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          labels: ['événements passés', "événements d'aujourd'hui", 'évènements à venir'],
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [2, -3, 8],
          stroke: { width: 0 },
          colors: [color1,color2,color3],
        },
      },
      supportTrackerRadialBar: {
        chartOptions: {
          plotOptions: {
            radialBar: {
              size: 150,
              offsetY: 20,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: '65%',
              },
              track: {
                background: '#fff',
                strokeWidth: '100%',
              },
              dataLabels: {
                name: {
                  offsetY: -5,
                  color: '#5e5873',
                  fontSize: '1rem',
                },
                value: {
                  offsetY: 15,
                  color: '#5e5873',
                  fontSize: '1.714rem',
                },
              },
            },
          },
          colors: [$themeColors.danger],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: [$themeColors.primary],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
          stroke: {
            dashArray: 8,
          },
          labels: ['Completed Tickets'],
        },
      },
    }
  },
}
</script>
