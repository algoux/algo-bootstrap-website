<script lang="ts">
import { Vue } from 'vue-class-component';

export default class NavBar extends Vue {
}
</script>

<template>
      <header class="content-header">
        <div class="content-header-navbar">
          <div class="logo">
            <div class="logo-icon">
              <img src="../assets/logo.png" alt="AlgoBootstrap" />
            </div>
            <span>AlgoBootstrap</span>
          </div>
          <div class="nav">
            <router-link class="nav-link" to="/">
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
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                />
              </svg>
              <span>Home</span>
            </router-link>
            <router-link class="nav-link" to="/about">
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
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
              <span>Doc</span>
            </router-link>
            <a class="nav-link" href="#" target="_blank">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span>F&Q</span>
            </a>
          </div>
        </div>
      </header>
</template>

<style scoped lang="less">
.content-header {
      height: 70px;
      @media screen and (max-width: 768px) {
        height: 40px;
      }
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 20px;
      z-index: 20;


      &-navbar {
        width: 80vw;
        height: 100%;
        border-radius: 100px;
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        outline: 1px solid rgba(255, 255, 255, 0.4);
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        color: var(--font-secondary-color);
        transition: color 0.5s ease;
        font-size: var(--font-medium-size);
        & .nav-link {
          color: var(--font-secondary-color);
        }
        & svg {
          stroke: var(--font-secondary-color);
        }

        &:hover {
          color: var(--font-primary-color);
          & .nav-link {
            color: var(--font-primary-color);
          }
          & svg {
            stroke: var(--font-primary-color);
          }
        }

        & .logo {
          flex-basis: 40%;
          height: 100%;
          display: flex;
          justify-content: left;
          padding-left: 50px;
          align-items: center;
          &-icon {
            width: 50px;
            height: 50px;
            position: relative;
            &::after {
              content: '';
              position: absolute;
              width: 110%;
              height: 100%;
              left: 0;
              bottom: 0;
              z-index: -1;
              filter: blur(30px);
              border-radius: 20px;
              background-color: #999cff;
              background-image: radial-gradient(at 85% 51%, hsla(60, 60%, 61%, 1) 0px, transparent 50%),
                radial-gradient(at 74% 68%, hsla(235, 69%, 77%, 1) 0px, transparent 50%),
                radial-gradient(at 64% 79%, hsla(284, 72%, 73%, 1) 0px, transparent 50%),
                radial-gradient(at 75% 16%, hsla(283, 60%, 72%, 1) 0px, transparent 50%),
                radial-gradient(at 90% 65%, hsla(153, 70%, 64%, 1) 0px, transparent 50%),
                radial-gradient(at 91% 83%, hsla(283, 74%, 69%, 1) 0px, transparent 50%),
                radial-gradient(at 72% 91%, hsla(213, 75%, 75%, 1) 0px, transparent 50%);
            }
            & img {
              width: auto;
              height: 50px;
              display: block;

              @media screen and (max-width: 768px) {
                height: 40px;
              }
            }
          }

          & span {
            margin-left: 10px;
            font-size: var(--font-medium-size);
            font-weight: 700;
          }
        }
        & .nav {
          flex-basis: 40%;
          height: 100%;
          display: flex;
          justify-content: end;
          align-items: center;
          // background-color: red;
          gap: 20px;
          padding-right: 50px;

          &-link {
            text-decoration: none;
            font-weight: 400;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: color 0.5s ease;

            & svg {
              width: 20px;
              height: 20px;
              margin-right: 5px;
              transition: stroke 0.5s ease;
            }

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
</style>