<script lang="ts">
import { Vue } from 'vue-class-component';

export default class NotFound extends Vue {}
</script>

<template>
  <div class="fallback">
    <h1>404</h1>
    <h2>
      Oops! The page you're looking for doesn't exist.
    </h2>
    <router-link to="/">返回主页 ↗</router-link>
  </div>
</template>

<style scoped lang="less">
.fallback {
  width: 100vw;
  height: 100dvh;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  & h1 {
    font-size: calc(var(--font-large-size) * 3);
    color: var(--font-primary-color);
  }

  & h2 {
    font-size: var(--font-medium-size);
    color: var(--font-secondary-color);
  }

  & a {
    font-size: var(--font-small-size);
    color: var(--font-secondary-color);
    transition: color 0.3s ease;
    text-decoration: none;
    &:hover {
      color: var(--font-primary-color);
      text-decoration: underline;
    }
  }
}
</style>
