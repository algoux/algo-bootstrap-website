<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { GuideRPO } from '@common/modules/guide/guide.rpo';

export default class Guide extends Vue {
  @Prop() guideProps!: GuideRPO;

  mounted() {
    // Do something when the component is mounted
    const texts = Array.from(document.querySelectorAll('.split-text')) as HTMLElement[];
    const textObserver = new IntersectionObserver((
      entries,
    ) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Do something when the text is in view
          (entry.target as HTMLElement).classList.add('text-show');
        } else {
          // Do something when the text is out of view
          (entry.target as HTMLElement).classList.remove('text-show');
        }
      });
    }, {
      threshold: 0.1
    });

    texts.forEach(text => {
      textObserver.observe(text);
    });
  }
}
</script>

<template>
  <div class="guide">
    <div class="guide-desc">
      <h1 class="split-text">{{ guideProps.title }}</h1>
      <p class="split-text">
        {{ guideProps.description }}
      </p>
      <a :href="guideProps.guideURL" class="split-text">视频教程 ↗</a>
    </div>
    <div class="guide-display">
      <div class="guide-display-mask"></div>
      <picture class="guide-display-video">
        <source :src="guideProps.videoURL">
      </picture>
    </div>
  </div>
</template>

<style scoped lang="less">
.text-show {
  opacity: 1 !important;
  transform: translateX(0%) !important;
}
.guide {
  width: 55%;
  height: 600px;
  display: flex;

  &-desc {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding-left: 30px;
    padding-right: 30px;
    line-height: 1.5;

    .hide() {
      opacity: 0;
      transform: translateX(50%);
      transition: transform .5s ease, opacity .3s ease;
    }

    & h1 {
      font-size: 30px;
      font-weight: 600;
      color: #c3d0e5;
      margin-bottom: 10px;
      .hide();
    }

    & p {
      font-size: 20px;
      font-weight: 500px;
      text-align: start;
      color: #9fb1d1;
      .hide();
      transition-delay: .2s;
    }

    & a {
      font-size: 20px;
      font-weight: 500;
      color: #4daafc;
      margin-top: 10px;
      .hide();
      transition-delay: .4s;
    }
  }

  &-display {
    width: 700px;
    height: 100%;
    min-width: 700px;
    border-radius: 20px;
    overflow: hidden;
    background-image: linear-gradient(to right bottom, #00b2b5 0%, #b500b8 100%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    position: relative;

    &-video {
        width: 60%;
        height: 80%;
        z-index: 10;
        background-color: gray;
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
