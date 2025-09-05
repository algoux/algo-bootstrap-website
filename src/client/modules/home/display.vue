<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DownloadButton from '@client/components/download-button.vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { isMac, isWindows } from '@client/utils';
import DataConfig from '@client/utils/data.config';

@Options({
  components: {
    DownloadButton,
  },
})
export default class Display extends Vue {
  @Prop({ type: String, required: true }) readonly platform!: string;
  @Prop({ type: Boolean, default: false }) readonly isMobile!: boolean;
  isSupportedPlatform = isMac() || isWindows();

  private getLinks() {
    return {
      docs: DataConfig.DOCS_LINK,
      faq: DataConfig.FAQ_LINK,
      sdutacm: DataConfig.SDUTACM_LINK,
      oj: DataConfig.OJ_LINK,
      bilibili: DataConfig.BILIBILI_LINK,
      oldWebsite: DataConfig.OLD_WEBSITE_LINK,
      vscode: DataConfig.VSCODE_LINK,
    };
  }

  get getVersion() {
    return process.env.VITE_VERSION;
  }
}
</script>

<template>
  <div class="content">
    <main class="content-main">
      <header class="content-main-title">
        <h1>
          Born for <br v-if="isMobile" />programming <br />
          beginners
        </h1>
        <h2>Quickly configure your VScode programming environment</h2>
      </header>
      <div class="content-main-subtitle">
        <DownloadButton :platform="platform" :is-home="true" />
        <a class="start" v-if="!isMobile" :href="getLinks().docs" target="_blank">
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
            class="lucide lucide-video-icon lucide-video"
          >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
          </svg>
          Learn More
        </a>
      </div>
      <div class="content-main-tools" v-if="!isMobile">
        <p v-if="isSupportedPlatform">version 1.1.0 for {{ platform }}</p>
        <p>
          By using AlgoBootstrap you need to download
          <a :href="getLinks().vscode" target="_blank">VScode</a> for your device.
        </p>
        <p>You can download historical versions from <a :href="'#'" target="_blank">GitHub</a>.</p>
        <p>
          Visit <a :href="getLinks().oj" target="_blank">SDUT OJ</a> to explore our products and contact us.
        </p>
        <p><a :href="getLinks().oldWebsite" class="old-web" target="_blank">Old website</a>.</p>
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
.old-web {
  color: var(--font-secondary-color);
  text-decoration: none;
  transition: color 0.5s ease;

  &:hover {
    color: var(--font-primary-color);
    text-decoration: underline;
  }
}

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

  @media screen and (max-width: 760px) {
    flex-direction: column;
    height: 30%;
    gap: 10px;
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

.content {
  position: relative;
  width: 70%;
  height: 100vh;
  @media screen and (max-height: 800px) {
    height: 150vh;
    
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    padding-top: 100px;
    padding-bottom: 100px;
  }
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
