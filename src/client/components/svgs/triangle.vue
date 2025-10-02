<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class Triangle extends Vue {
  @Prop({ type: Boolean, required: true }) isOpen!: boolean;
}
</script>

<template>
  <svg
    class="start-svg"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</template>

<style lang="less" scoped>
.start-svg {
  width: calc(var(--font-small-size) * 1.5);
  height: calc(var(--font-small-size) * 1.5);
  min-width: 0;
  min-height: 0;
  max-width: 100%;
  max-height: 100%;
  display: inline-block;
  vertical-align: middle;
}
</style>
