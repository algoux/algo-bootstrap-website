<script lang="ts">
import { Vue } from 'vue-class-component';
export default class MenuLines extends Vue {}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="menu-icon close-icon"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
</template>

<style lang="less" scoped>
.menu-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    opacity: 1;

    &.hidden {
      opacity: 0 !important;
      transform: translate(-50%, -50%) rotate(90deg) !important;
      pointer-events: none;
    }

    &.close-icon:not(.hidden) {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
</style>
