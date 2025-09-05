<script lang="ts">
import { Vue } from 'vue-class-component';

export default class BackTop extends Vue {
  $refs!: {
    backtop: HTMLElement;
  };
  mounted() {
    const backtop = this.$refs.backtop as HTMLElement;
    backtop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        backtop.style.opacity = '1';
      } else {
        backtop.style.opacity = '0';
      }
    });
  }

    beforeDestroy() {
        const backtop = this.$refs.backtop as HTMLElement;
        backtop.removeEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        });
        window.removeEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backtop.style.opacity = '1';
        } else {
            backtop.style.opacity = '0';
        }
        });
    }
}
</script>

<template>
  <div class="backtop" ref="backtop">
    <div class="backtop-inner"></div>
  </div>
</template>

<style scoped lang="less">
.backtop {
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 40px;
  height: 40px;
  background-color: var(--glass-bg-color);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border-color);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 999;
  transition: background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;

  .backtop-inner {
    width: 10px;
    height: 10px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background-color: var(--font-primary-color);
  }
}
</style>
