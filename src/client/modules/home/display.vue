<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DownloadButton from '@client/components/download-button.vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

@Options({
  components: {
    DownloadButton,
  },
})
export default class Display extends Vue {
  @Prop({ type: String, required: true }) readonly platform!: string;
  @Prop({ type: Boolean, default: false }) readonly isMobile!: boolean;

  private splitTextAnimate() {
    const splitText_title = new SplitText('.content-main-title h1', {
      type: 'chars',
      linesClass: 'chars',
    });

    const splitText_subtitle = new SplitText('.content-main-title h2', {
      type: 'words',
      linesClass: 'words',
    });
    gsap.from(splitText_title.chars, {
      duration: 0.6,
      x: 150,
      opacity: 0,
      ease: 'power4',
      stagger: 0.04,
    });
    gsap.from(splitText_subtitle.words, {
      duration: 0.7,
      y: -100,
      opacity: 0,
      rotation: 'random(-80, 80)',
      ease: 'back',
      delay: 1,
      stagger: 0.15,
    });
  }

  mounted() {
    gsap.registerPlugin(SplitText);
    this.splitTextAnimate();
  }
}
</script>

<template>
  <div class="content">
    <main class="content-main">
      <header class="content-main-title">
        <a href="https://ab.algoux.org/" target="_blank" class="old-version">
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
          >
            <path
              d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
            />
            <path d="M12 22V12" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <path d="m7.5 4.27 9 5.15" />
          </svg>
          <span>Old Website</span>
        </a>
        <h1>
          Born for programming <br />
          beginners
        </h1>
        <h2>Quickly configure your VScode programming environment</h2>
      </header>
      <div class="content-main-subtitle">
        <DownloadButton :platform="platform" />
        <router-link class="start" to="/about">
          <img src="../../assets/images/sparkles.png" style="height: calc(var(--font-small-size) * 1.5)" alt="" />
          Learn More
        </router-link>
        <span class="download-all-platforms"
          >Download for <router-link class="link" to="/releases">other platforms</router-link>.</span
        >
      </div>
      <div class="content-main-tools" v-if="!isMobile">
        <p>version 1.1.0 for macOS</p>
        <p>
          By using AlgoBootstrap you need to download
          <a href="https://code.visualstudio.com/" target="_blank">VScode</a> for your device.
        </p>
        <p>You can download historical versions from <a href="#" target="_blank">GitHub</a>.</p>
        <p>
          Visit <a href="https://oj.sdutacm.cn/" target="_blank">SDUT OJ</a> to explore our products and contact us.
        </p>
      </div>
    </main>
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
        v-if="!isMobile"
      >
        <rect x="5" y="2" width="14" height="20" rx="7" />
        <path d="M12 6v4" />
      </svg>
  </div>
</template>

<style scoped lang="less">
.mouse {
  position: absolute;
  bottom: 10%;
  opacity: 1;
  width: calc(var(--font-small-size) * 1.5);
  transform: scale(1);
  animation: mouse 1.5s infinite;
  @keyframes mouse {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(1.3);
    }
  }
}

.content-main-subtitle {
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  user-select: none;
  position: relative;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 30%;
    gap: 10px;
  }

  & .download-all-platforms {
    position: absolute;
    bottom: 0;
    color: var(--font-secondary-color);
    font-size: var(--font-small-size);

    & .link {
      color: var(--font-primary-color);
    }
  }

  & .start {
    padding: 10px 15px;
    @media screen and (min-width: 768px) {
      padding: 15px 20px;
    }
    @media screen and (min-width: 1700px) {
      padding: 20px 25px;
    }
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 100px;
    font-size: var(--font-small-size);
    font-weight: 600;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    outline: 1px solid rgba(255, 255, 255, 0.4);
    color: var(--font-secondary-color);
    transition: color 0.5s ease;
    cursor: pointer;
    &:hover {
      color: var(--font-primary-color);
    }
  }
}

.old-version {
  padding: 10px 15px;
  @media screen and (min-width: 768px) {
    padding: 15px 20px;
  }
  @media screen and (min-width: 1700px) {
    padding: 20px 25px;
  }
  background-color: var(--glass-bg-color);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  border: 1px solid var(--glass-border-color);
  color: var(--font-secondary-color);
  font-size: var(--font-small-size);
  display: flex;
  justify-content: center;
  gap: 20px;
  text-decoration: none;
  align-items: center;
  transition: color 0.5s ease;
  & svg {
    height: calc(var(--font-small-size) * 1.5);
  }
  &:hover {
    color: var(--font-primary-color);
  }
}
.content {
  position: relative;
  width: 70%;
  height: 100vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: 10px;
  }

  &-main {
    flex-basis: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    @media screen and (max-width: 760px) {
      gap: 10px;
    }
    &-title {
      width: 100%;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: var(--font-large-size) !important;
      user-select: none;
      gap: 40px;

      @media screen and (max-width: 1700px) {
        gap: 20px;
      }
      @media screen and (max-width: 768px) {
        gap: 10px;
      }

      & h1 {
        color: var(--font-primary-color);
      }

      & h2 {
        font-size: var(--font-medium-size);
        color: var(--font-secondary-color);
      }
    }

    &-tools {
      flex-basis: 20%;
      width: 100%;
      user-select: none;

      & p {
        color: var(--font-secondary-color);
        line-height: 1.5;
        font-size: var(--font-small-size);
      }

      & a {
        color: var(--font-primary-color);
        font-size: var(--font-small-size);
      }
    }
  }

  &-footer {
    flex-basis: 5%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-secondary-color);
    user-select: none;
    position: relative;
    font-size: var(--font-small-size) !important;
    padding: 0 20px;

    

    @media (max-width: 768px) {
      font-size: 12px !important;
      padding: 0 10px;
      
      & p {
        gap: 2px;
      }
    }

    @media (max-width: 480px) {
      font-size: 11px !important;
      
      & p {
        flex-direction: column;
        gap: 5px;
      }
    }

    & img {
      height: 25px;
    }
  }
}
</style>
