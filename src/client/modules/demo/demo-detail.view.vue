<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';

@View('/demo')
@Options({
  name: 'DemoDetail',
  // Define any additional options or components needed for this view
})
export default class DemoDetail extends Vue {
  // Define any properties or methods needed for this component
}
</script>

<template>
  <div>Demo</div>
</template>
