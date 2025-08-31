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
      this.$refs['guide-video']
    ];

    const videoContainer = this.$refs['guide-video'] as HTMLElement;
    const video = videoContainer?.querySelector('video') as HTMLVideoElement | null;

    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          texts.forEach(text => {
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
    }, {
      threshold: 0.5
    });

    textObserver.observe(guide);
  }
}
</script>

<template>
  <div class="guide" ref="guide">
    <div class="guide-desc">
      <h1 class="split-text" ref="split-text-title">{{ guideProps.title }}</h1>
      <p class="split-text" ref="split-text-desc">
        {{ guideProps.description }}
      </p>
      <a :href="guideProps.guideURL" class="split-text" ref="split-text-link">视频教程 ↗</a>
    </div>
    <div class="guide-display" ref="guide-video">
      <div class="guide-display-mask"></div>
      <video class="guide-display-video" autoplay muted loop playsinline>
        <source src="../assets/video/demo.mov">
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
  width: 80vh;  
  height: 800px;
  display: flex;
  flex-direction: column;
  .hide() {
      opacity: 0;
      transform: translateX(100px);
      transition: transform .5s ease, opacity .3s ease;
    }

  &-desc {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding-left: 30px;
    padding-right: 30px;
    line-height: 1.5;

    & h1 {
      font-size: 30px;
      font-weight: 600;
      color: var(--font-primary-color);
      margin-bottom: 10px;
      .hide();
    }

    & p {
      font-size: 20px;
      font-weight: 500px;
      text-align: start;
      color: var(--font-secondary-color);
      .hide();
      transition-delay: .2s;
    }

    & a {
      font-size: 16px;
      font-weight: 500;
      color: #4daafc;
      margin-top: 10px;
      .hide();
      transition-delay: .4s;
    }
  }

  &-display {
    width: 100%;
    height: 80%;
    min-width: 700px;
    border-radius: 20px;
    overflow: hidden;
    background-image: linear-gradient(to right bottom, #00b2b5 0%, #b500b8 100%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    position: relative;
    .hide();
    transform: translateY(20%);
    transition: transform .5s ease, opacity .5s ease !important;
    display: flex;
    justify-content: center;
    align-items: center;
    &-video {
        width: 90%;
        height: auto;
        max-height: 90%;
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
