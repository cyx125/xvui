<template>
  <div class="wxc-city" ref="city" :style="cityExtendStyle">
    <wxc-searchbar ref="wxc-searchbar"
                   v-bind="mergeInputConfig"
                   @wxcSearchbarInputOnInput="onInput"
                   @wxcSearchbarInputReturned="onSubmit"
                   @wxcSearchbarCancelClicked="onCancel"></wxc-searchbar>

    <wxc-tab ref="wxc-tab"
             v-if="showTab"
             @wxcTabSwitch="onTabSwitch"></wxc-tab>

    <wxc-indexlist :normal-list="normalList"
                   :hot-list-config="hotListConfig"
                   :nav-style="{ top: '24px'}"
                   :height="listHeight"
                   :show-index="showIndex"
                   :only-show-list="!showNavHeader || onlyShowList"
                   :city-location-config="currentCityLocationConfig"
                   @wxcIndexlistItemClicked="onItemClick"></wxc-indexlist>

    <wxc-result type="noGoods"
                :wrap-style="{top:'84px'}"
                :show="true"
                :customSet="result"
                v-if="showError"></wxc-result>
  </div>
</template>

<script>
  import defaultSourceData from './default-data';
  import * as Util from './util';
  import XUtil from '@xvue/xutil';
  import wxcTab from './tab.vue';
  import WxcSearchbar from '../wxc-searchbar'
  import WxcResult from '../wxc-result';
  import WxcIndexlist from '../wxc-indexlist';

  export default {
    components: { wxcTab, WxcSearchbar, WxcResult, WxcIndexlist },
    props: {
      animationType: {
        type: String,
        default: 'push'
      },
      inputConfig: {
        type: Object,
        default: () => ({})
      },
      sourceData: {
        type: Object,
        default: () => defaultSourceData
      },
      cityStyleType: {
        type: String,
        default: 'list'
      },
      currentLocation: String,
      cityHeight: {
        type: Number,
        default: 0
      },
      showTab: {
        type: Boolean,
        default: false
      },
      showIndex: {
        type: Boolean,
        default: true
      },
      showNavHeader: {
        type: Boolean,
        default: true
      },
    },
    data: () => ({
      tId: null,
      saveDefaultSourceData: {},
      onlyShowList: false,
      result: {
        noGoods: {
          pic: 'https://img.alicdn.com/tfs/TB1SpPHkf2H8KJjy0FcXXaDlFXa-200-200.png',
          button: '',
          content: '搜索无结果'
        }
      }
    }),
    created () {
      this.saveDefaultSourceData = this.sourceData
    },
    computed: {
      cityExtendStyle () {
        return XUtil.uiStyle.pageTransitionAnimationStyle(this.animationType)
      },
      currentCityLocationConfig () {
        if (this.currentLocation) {
          return {
            type: this.cityStyleType,
            title: '定位',
            list: [
              { name: this.currentLocation, isLocation: true }
            ]
          }
        } else {
          return {};
        }
      },
      normalList () {
        return Util.getCities(this.sourceData.cities)
      },
      hotListConfig () {
        return {
          type: this.cityStyleType,
          title: '热门',
          list: Util.getCities((this.sourceData.hotCity))
        }
      },
      showError () {
        const { normalList, hotListConfig } = this;
        return (normalList && normalList.length < 1) && (hotListConfig && hotListConfig.list && hotListConfig.list.length < 1)
      },
      listHeight () {
        // 兼容去头逻辑
        let pageHeight = XUtil.env.getPageHeight();

        const { cityHeight } = this;
        if (cityHeight && !isNaN(cityHeight) && cityHeight > 0) {
          pageHeight = cityHeight;
        }
        // searchInput 84
        const tabHeight = this.showTab ? 90 : 0;
        return pageHeight - 84 - tabHeight;
      },
      mergeInputConfig () {
        return {
          autofocus: false,
          alwaysShowCancel: true,
          placeholder: '中文/拼音/首字母',
          ...this.inputConfig
        }
      }
    },
    methods: {
      onTabSwitch (e) {
        this.$emit('wxcTabSwitch', e);
      },
      switchTab (i = 0) {
        setTimeout(() => {
          this.$refs['wxc-tab'].switchTab(i)
        }, 100);
      },
      onItemClick (e) {
        this.$refs['wxc-searchbar'].autoBlur();
        this.show(false);
        this.$emit('wxcCityItemSelected', { item: e.item });
      },
      onInput (e) {
        clearTimeout(this.tId);
        const { cities } = this.sourceData;
        const { value } = e;
        if (value !== '' && cities && cities.length > 0) {
          const queryData = Util.query(cities, String(value).trim());
          this.sourceData = {
            cities: queryData,
            hotCity: []
          };
          this.onlyShowList = true;
        } else {
          this.sourceData = this.saveDefaultSourceData;
          this.onlyShowList = false;
        }
        this.tId = setTimeout(() => {
          this.$emit('wxcCityOnInput', {
            value: e.value
          });
        }, 300);
      },
      onCancel () {
        this.autoBlur();
        this.show(false);
        this.$emit('wxcCityCanceled', {});
      },
      onSubmit (e) {
        this.autoBlur();
        this.$emit('wxcCityOnKeyUpEnter', { value: e.value });
      },
      autoBlur () {
        const inputRef = this.$refs['wxc-searchbar'];
        inputRef && inputRef.autoBlur();
      },
      show (status = true, callback = null) {
        const ref = this.$refs.city
        if (this.animationType === 'push') {
          XUtil.animation.pageTransitionAnimation(ref, `translateX(${status ? -750 : 750}px)`, status, callback)
        } else if (this.animationType === 'model') {
          XUtil.animation.pageTransitionAnimation(ref, `translateY(${status ? -XUtil.env.getScreenHeight() : XUtil.env.getScreenHeight()}px)`, status, callback)
        }
      }
    }
  };
</script>

<style scoped>
  .wxc-city {
    position: fixed;
    width: 750px;
    background-color: #F2F3F4;
  }
</style>
