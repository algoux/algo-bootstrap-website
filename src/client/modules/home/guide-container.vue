<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Guide from '@client/components/guide.vue';

@Options({
  components: {
    Guide,
  },
})
export default class GuideContainer extends Vue {}
</script>

<template>
  <div class="about">
    <header class="about-title">
      <div class="about-title-font">Feature</div>
    </header>
    <div class="about-guide">
      <Guide
        :guide-props="{
          title: '喵喵喵喵喵喵喵喵',
          description: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵',
          guideURL: 'https://www.bilibili.com/video/BV1zD4y1D7gD',
        }"
      />
      <Guide
        :guide-props="{
          title: '喵喵喵喵喵喵喵喵',
          description: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵',
          guideURL: 'https://www.bilibili.com/video/BV1zD4y1D7gD',
        }"
      />
      <Guide
        :guide-props="{
          title: '喵喵喵喵喵喵喵喵',
          description: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵',
          guideURL: 'https://www.bilibili.com/video/BV1zD4y1D7gD',
        }"
      />
      <Guide
        :guide-props="{
          title: '喵喵喵喵喵喵喵喵',
          description: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵',
          guideURL: 'https://www.bilibili.com/video/BV1zD4y1D7gD',
        }"
      />
      <Guide
        :guide-props="{
          title: '喵喵喵喵喵喵喵喵',
          description: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵',
          guideURL: 'https://www.bilibili.com/video/BV1zD4y1D7gD',
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.about {
  width: 100vw;
  height: auto;
  min-height: 100dvh;
  position: relative;
  z-index: 10;

  &-guide {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    @media screen and (max-width: 768px) {
      padding-top: 20px;
      gap: 80px;
    }
    gap: 120px;
  }

  &-title {
    width: 100%;
    height: fit-content;
    @media screen and (max-width: 768px) {
      height: fit-content;
      gap: 10px;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    gap: 20px;

    &-font {
      width: fit-content;
      height: fit-content;
      color: var(--font-primary-color);
      font-size: 50px !important;
      font-weight: 700;
      line-height: 1.2;
      
      @media screen and (max-width: 1700px) {
        font-size: 30px !important;
      }
      
      @media screen and (max-width: 768px) {
        font-size: 25px !important;
      }
    }

    & .video-link {
      width: fit-content;
      height: fit-content;
      font-size: var(--font-small-size);
      color: var(--font-secondary-color);
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      position: relative;
      transition: color 0.3s ease;

      &:hover {
        color: var(--font-primary-color);
        &::after {
          opacity: 1;
          background-color: var(--font-primary-color);
        }
      }

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: var(--font-secondary-color);
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0;
        transform: translateY(120%);
        transition: background-color 0.3s ease, opacity 0.3s ease;
      }

      & svg {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
