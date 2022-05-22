<template>
  <div v-if="options">
    <div class="d-flex align-items-center">
      <b-avatar
        rounded
        size="42"
        variant="light-primary"
        class="mr-1"
      >
        <feather-icon
          :icon="options.icon"
          size="20"
        />

      </b-avatar>
      <div>
        <h4 class="mb-0">
          {{ options.name }}
        </h4>
        <span>{{ options.name }}</span>
      </div>
    </div>

    <!-- collapse -->
    <app-collapse
      id="faq-payment-qna"
      accordion
      type="margin"
      class="mt-2"
    >

      <app-collapse-item
     
      >
        "bbn"
      </app-collapse-item>

    </app-collapse>

    <!--/ collapse -->
  </div>
</template>

<script>
import { BAvatar } from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

export default {
  components: {
    BAvatar,
    AppCollapseItem,
    AppCollapse,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
