<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class Mouse extends Vue {
}
</script>

<template>
  <svg
    class="mouse"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--font-primary-color)"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="7" />
    <path d="M12 6v4" />
  </svg>
</template>

<style lang="less" scoped>
.mouse {
  position: absolute;
  bottom: 5%;
  opacity: 0;
  width: calc(var(--font-small-size) * 1.5);
  transform: scale(1);
  transition: all 0.3s ease;
}
</style>
