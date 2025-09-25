<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { GuideRPO } from '@common/modules/guide/guide.rpo';

export default class Guide extends Vue {
  @Prop() guideProps!: GuideRPO;

  $refs!: {
    'split-text-title': HTMLElement;
    'split-text-desc': HTMLElement;
    'split-text-link': HTMLElement;
    'guide-video': HTMLElement;
    guide: HTMLElement;
  };

  mounted() {
    const guide = this.$refs.guide;
    const texts = [
      this.$refs['split-text-title'],
      this.$refs['split-text-desc'],
      this.$refs['split-text-link'],
      this.$refs['guide-video'],
    ];

    const videoContainer = this.$refs['guide-video'] as HTMLElement;
    const video = videoContainer?.querySelector('video') as HTMLVideoElement | null;

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            texts.forEach((text) => {
              text.classList.add('text-show');
            });
            if (video && video.paused) {
              video.play();
            }
          } else {
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    textObserver.observe(guide);
  }
}
</script>

<template>
  <div class="guide" ref="guide">
    <div class="guide-desc">
      <h1 class="split-text" ref="split-text-title">
        {{ guideProps.title }}
      </h1>
      <p class="split-text" ref="split-text-desc">
        {{ guideProps.description }}
      </p>
      <a :href="guideProps.guideURL" class="split-text" ref="split-text-link">视频教程 ↗</a>
    </div>
    <div class="guide-display" ref="guide-video">
      <div class="guide-display-video">
        <img src="../assets/video/demo.png" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.text-show {
  opacity: 1 !important;
  transform: translateY(0%) !important;
}
.guide {
  width: 65%;
  @media screen and (max-width: 1200px) {
    width: 75%;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
  }
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  .hide(@delay: 0s) {
    opacity: 0;
    transform: translateY(30px);
    transition: transform 0.5s ease, opacity 0.3s ease;
    transition-delay: @delay;
  }

  &-desc {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    line-height: 1.5;

    & h1 {
      display: flex;
      width: fit-content;
      height: fit-content;
      align-items: center;
      font-weight: 600;
      max-width: 100%;
      font-size: calc(var(--font-medium-size) * 1.5);
      color: var(--font-primary-color);
      margin-bottom: 10px;
      position: relative;
      .hide();
    }

    & p {
      font-size: 20px;
      font-weight: 500px;
      max-width: 100%;
      text-align: start;
      font-size: var(--font-medium-size);
      color: var(--font-secondary-color);
      .hide(0.2s);
    }

    & a {
      max-width: 100%;
      font-size: var(--font-small-size);
      font-weight: 500;
      color: #4daafc;
      line-height: 1.5;
      .hide(0.4s);
    }
  }

  &-display {
    width: 100%;
    height: fit-content;
    margin-top: 20px;
    @media screen and (max-width: 768px) {
      padding: 10px 0px;
      border-radius: 5px;
    }
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    position: relative;
    .hide(0.5s);
    display: flex;
    justify-content: center;
    align-items: center;
    &-video {
      width: 100%;
      height: auto;
      background-color: transparent;
      z-index: 10;
      & img {
        width: 100%;
        background-color: transparent;
      }
    }
  }
}
</style>
