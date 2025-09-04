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
        <img src="@client/assets/images/star.png" alt="" />
        {{ guideProps.title }}
        <img src="@client/assets/images/star.png" alt="" />
      </h1>
      <p class="split-text" ref="split-text-desc">
        {{ guideProps.description }}
      </p>
      <a :href="guideProps.guideURL" class="split-text" ref="split-text-link">视频教程 ↗</a>
    </div>
    <div class="guide-display" ref="guide-video">
      <div class="guide-display-mask"></div>
      <video class="guide-display-video" autoplay muted loop playsinline>
        <source src="../assets/video/demo.webm" />
      </video>
    </div>
  </div>
</template>

<style scoped lang="less">
.text-show {
  opacity: 1 !important;
  transform: translateX(0%) translateY(0%) !important;
}
.guide {
  width: 55%;
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
  .hide() {
    opacity: 0;
    transform: translateX(100px);
    transition: transform 0.5s ease, opacity 0.3s ease;
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
      font-size: var(--font-medium-size);
      color: var(--font-primary-color);
      margin-bottom: 10px;
      position: relative;
      .hide();
      & img {
        position: absolute;
        height: var(--font-medium-size);
      }
      & img:nth-child(1) {
        left: 0;
        transform: translateX(-120%);
      }

      & img:nth-child(2) {
        right: 0;
        transform: translateX(120%);
      }
    }

    & p {
      font-size: 20px;
      font-weight: 500px;
      max-width: 100%;
      text-align: start;
      font-size: var(--font-medium-size);
      color: var(--font-secondary-color);
      .hide();
      transition-delay: 0.2s;
    }

    & a {
      max-width: 100%;
      font-size: var(--font-small-size);
      font-weight: 500;
      color: #4daafc;
      line-height: 1.5;
      .hide();
      transition-delay: 0.4s;
    }
  }

  &-display {
    width: 100%;
    height: fit-content;
    margin-top: 20px;
    padding: 20px 0px;
    border-radius: 10px;
    overflow: hidden;
     @media screen and (max-width: 768px) {
      padding: 10px 0px;
      border-radius: 10px;
    }
    background-image: linear-gradient(to right bottom, #00b2b5 0%, #b500b8 100%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    position: relative;
    .hide();
    transform: translateY(20%);
    transition: transform 0.5s ease, opacity 0.5s ease !important;
    display: flex;
    justify-content: center;
    align-items: center;
    &-video {
      width: 90%;
      height: auto;
      background-color: none;
      z-index: 10;
    }

    &-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
