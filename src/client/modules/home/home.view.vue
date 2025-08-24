<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import Beams from '@client/components/beams.vue';
import NavBar from '@client/components/nav-bar.vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import DownloadButton from '@client/components/download-button.vue';

gsap.registerPlugin(SplitText);

@View('/')
@Options({
  components: {
    Beams,
    NavBar,
    DownloadButton,
  },
})
export default class Home extends Vue {
  mounted() {
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
}
</script>

<template>
  <div class="home">
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
          <DownloadButton platform="mac" />
          <router-link class="btn start" to="/about">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
              />
              <path d="M20 2v4" />
              <path d="M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
            Learn More
          </router-link>
          <span class="download-all-platforms"
            >Download for <router-link class="link" to="/releases">all platforms</router-link>.</span
          >
        </div>
        <div class="content-main-tools">
          <p>version 1.1.0 for macOS</p>
          <p>
            By using AlgoBootstrap you need to download
            <a href="https://code.visualstudio.com/" target="_blank">VScode</a> for your device.
          </p>
          <p>You can download historical versions from <a href="#" target="_blank">GitHub</a>.</p>
          <p>
            Visit <a href="https://oj.sdutacm.cn/" target="_blank">SDUT OJ</a> to explore our products and contact us.
          </p>
          <p>© 2008-2025 SDUTACM. All Rights Reserved.</p>
        </div>
      </main>
      <footer class="content-footer">
        <p>
          <span>Developed by &nbsp;</span
          ><a href="https://github.com/dreamerblue" class="blue" target="_blank"
            ><img src="../../assets/blue.png" alt="" />&nbsp;bLue</a
          >&nbsp;×&nbsp;
          <a href="https://github.com/ATRIOR-LCL" class="atrior" target="_blank"
            ><img src="../../assets/atrior.png" alt="" />&nbsp;atrior</a
          >&nbsp;of the&nbsp;<a href="https://lcl.sdutacm.cn/" target="_blank">SDUTACM Lightcone Laboratory</a
          >&nbsp;with ❤️
        </p>
      </footer>
    </div>
    <Beams
      :beam-width="2"
      :beam-height="15"
      :beam-number="12"
      :speed="2"
      :noise-intensity="1.75"
      :scale="0.15"
      :rotation="30"
    />
  </div>
</template>

<style scoped lang="less">
.content-main-subtitle {
  height: 20%;
  width: 50%;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  // background-color: red;
  margin-bottom: 50px;
  position: relative;
  & .download-all-platforms {
    position: absolute;
    bottom: 0;
    color: var(--font-secondary-color);
    font-size: 16px;

    & .link {
      color: var(--font-primary-color);
    }
  }

  & .btn {
    width: 250px;
    height: 70px;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 100px;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  & .download {
    width: 300px;
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: 2px solid transparent;
    outline: 2px solid var(--glass-border-color);

    & img {
      height: 40%;
    }

    &:hover {
      background-color: #dddddd;
    }
  }

  & .start {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  width: 250px;
  height: 45px;
  background-color: var(--glass-bg-color);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  border: 1px solid var(--glass-border-color);
  color: var(--font-secondary-color);
  font-size: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  text-decoration: none;
  align-items: center;
  transition: color 0.5s ease;
  &:hover {
    color: var(--font-primary-color);
  }
}

.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & .content {
    position: absolute;
    width: 70%;
    height: 100%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &-main {
      flex-basis: 60%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 100px;
      &-title {
        flex-basis: 60%;
        width: 80%;
        font-size: 50px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        flex-direction: column;
        gap: 40px;

        & h1 {
          color: var(--font-primary-color);
        }

        & h2 {
          font-size: 25px;
          color: var(--font-secondary-color);
        }
        // background-color: yellow;
      }

      &-tools {
        flex-basis: 20%;
        width: 100%;
        user-select: none;
        // padding-top: 100px;

        & p {
          color: var(--font-secondary-color);
          line-height: 1.5;
        }

        & a {
          color: var(--font-primary-color);
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

      & p {
        display: flex;
        justify-content: center;
        align-items: center;

        & a {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--font-primary-color);
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          &.blue {
            color: #409eff;
          }

          &.atrior {
            color: #e6c623;
          }
        }
      }

      & img {
        height: 30px;
      }
    }
  }
}
</style>
