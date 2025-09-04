<script lang="ts">
import { Vue } from 'vue-class-component';
import DataConfig from '@client/utils/data.config';

export default class HomeFooter extends Vue {

  getLinks() {
    return {
      docs: DataConfig.DOCS_LINK,
      faq: DataConfig.FAQ_LINK,
      sdutacm: DataConfig.SDUTACM_LINK,
      oj: DataConfig.OJ_LINK,
      bilibili: DataConfig.BILIBILI_LINK,
      oldWebsite: DataConfig.OLD_WEBSITE_LINK,
      vscode: DataConfig.VSCODE_LINK,
      bLue: DataConfig.BLUE_GITHUB_LINK,
      atrior: DataConfig.ATRIOR_GITHUB_LINK,
    };
  }
}
</script>

<template>
    <footer>
      <div class="friend-link">
        <a href="#" class="friend-link-item" target="_blank">
          <img src="../assets/images/github.png" alt="">
          GitHub
        </a>
        <a :href="getLinks().sdutacm" class="friend-link-item" target="_blank">
          <img src="../assets/images/sdutacm_logo_colorful.png" alt="">
          SDUTACM
        </a>
        <a :href="getLinks().bilibili" class="friend-link-item" target="_blank">
          <img src="../assets/images/bilibili.png" alt="">
          bilibili
        </a>
        <a :href="getLinks().docs" class="friend-link-item" target="_blank">
          <img src="../assets/images/docs.png" alt="">
          Help
        </a>
      </div>
        <p class="developer-info">
            <span class="developer-info">Developed by &nbsp;<a :href="getLinks().bLue" class="blue" target="_blank"><img src="@client/assets/blue.png" alt="" />&nbsp;bLue</a>&nbsp;×&nbsp;<a :href="getLinks().atrior" class="atrior" target="_blank"><img src="@client/assets/atrior.png" alt="" />&nbsp;atrior</a>&nbsp;of the&nbsp;</span><a href="https://lcl.sdutacm.cn/" target="_blank">SDUTACM Lightcone Laboratory</a><span>&nbsp;with ❤️</span>
        </p>
        <p class="copyright">© 2008-2025 SDUTACM. All Rights Reserved.</p>
    </footer>
</template>

<style scoped lang="less">
footer {
    width: 100vw;
    height: auto;
    margin-top: 100px;

    @media screen and (max-width: 768px) {
      height: auto;
      padding: 40px 0;
      margin-top: 50px;
      
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    gap: 30px;
    
    & .friend-link {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;

      &-item {
        font-size: var(--font-small-size);
        // width: 150px;
        height: fit-content;
        padding: 5px 10px;
        color: var(--font-secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        text-decoration: none;
        gap: 5px;
        font-weight: 600;
        transition: color 0.5s ease;
        &:hover {
          color: var(--font-primary-color);
        }
        & img {
          height: calc(var(--font-small-size));
        }
      }
    }

    @media screen and (max-width: 768px) {
      width: 80vw;
    }

    & .copyright {
        color: var(--font-secondary-color);
        line-height: 1.5;
        font-size: var(--font-small-size);
    }

    & .developer-info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      text-align: center;
      line-height: 1.5;
      font-size: var(--font-small-size);
      color: var(--font-secondary-color);

      & a {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: var(--font-primary-color);
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;

        & img {
            display: block;
            height: calc(var(--font-small-size) * 1.5);
        }
        &.blue {
          color: #409eff;
        }

        &.atrior {
          color: #e6c623;
        }
      }

      & span {
        white-space: nowrap;
      }
    }
}
</style>