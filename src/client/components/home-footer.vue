<script lang="ts">
import { Vue } from 'vue-class-component';
import DataConfig from '@client/utils/data.config';

export default class HomeFooter extends Vue {

  getLinks() {
    return {
      rankland: DataConfig.RANKLAND_LINK,
      sdutacm: DataConfig.SDUTACM_LINK,
      algoUX: DataConfig.ALGOUX_LINK,
      pasteThenAC: DataConfig.PASTE_THEN_AC_LINK,
    };
  }
}
</script>

<template>
    <footer>
      <div class="friend-link">
        <a :href="getLinks().algoUX" class="friend-link-item" target="_blank">
          <img src="../assets/images/algoUX.ico" alt="">
          algoUX
        </a>
        <a :href="getLinks().sdutacm" class="friend-link-item" target="_blank">
          <img src="../assets/images/sdutacm_logo_colorful.png" alt="">
          SDUTACM
        </a>
        <a :href="getLinks().rankland" class="friend-link-item" target="_blank">
          <img src="../assets/images/rankland.ico" alt="">
          RankLand
        </a>
        <a :href="getLinks().pasteThenAC" class="friend-link-item" target="_blank">
          <img src="../assets/images/thenac.ico" alt="">
          paste.then.ac
        </a>
      </div>
        <p class="copyright">© 2019-present algoUX. All Rights Reserved.</p>
    </footer>
</template>

<style scoped lang="less">
footer {
    width: 100vw;
    height: auto;
    margin-top: 100px;
    user-select: none;

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
}
</style>