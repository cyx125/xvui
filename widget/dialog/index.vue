<template>
  <div class="container">
    <x-overlay v-if="show" :show="true" @wxcOverlayBodyClicked="wxcOverlayBodyClicked"></x-overlay>
    <div class="dialog-out-box"  v-if="show">
      <div class="dialog-box">
        <div class="dialog-content">
          <slot name="title">
            <text class="content-title">{{title}}</text>
          </slot>
          <slot name="content">
            <text class="content-subtext">{{content}}</text>
          </slot>
          <div class="no-prompt"
              v-if="showNoPrompt"
              @click="noPromptClicked">
            <image :src="noPromptIcon" class="no-prompt-icon"></image>
            <text class="no-prompt-text">{{noPromptText}}</text>
          </div>
        </div>
        <div class="dialog-footer">
          <div class="footer-btn cancel"
              v-if="!single"
              @click="secondaryClicked">
            <text class="btn-text" :style="{ color: secondBtnColor }">{{cancelText}}</text>
          </div>
          <div class="footer-btn confirm" @click="primaryClicked">
            <text class="btn-text" :style="{ color: mainBtnColor }">{{confirmText}}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    position: absolute;
    /*兼容H5异常*/
    /* top: 0;
    right: 0;
    bottom: 0;
    left: 0; */
    z-index: 99999;
  }
  .dialog-out-box{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /*兼容H5异常*/
    display: flex;
    z-index: 99999;
    align-items: center;
    justify-content: center;
  }
  .dialog-box {
    /*  position: fixed;
    left: 96px; */
    width: 558px; 
    background-color: #FFFFFF;
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 36px;
    padding-right: 36px;
  }

  .content-title {
    color: #333333;
    font-size: 36px;
    text-align: center;
    margin-bottom: 24px;
  }

  .content-subtext {
    color: #666666;
    font-size: 26px;
    line-height: 36px;
    text-align: center;
  }

  .dialog-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-color: #F3F3F3;
    border-top-width: 2px;
    border-top-style:solid;
  }

  .footer-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 90px;
  }

  .cancel {
    border-right-color: #F3F3F3;
    border-right-width: 2px;
    border-right-style:solid;
  }

  .btn-text {
    font-size: 36px;
    color: #666666;
  }

  .no-prompt {
    display: flex;
    width: 486px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 24px;
  }

  .no-prompt-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  .no-prompt-text {
    font-size: 24px;
    color: #A5A5A5;
  }
</style>

<script>
import XOverlay from '../overlay/index.vue'

import { CHECKED, UN_CHECKED } from './type';
export default {
  components: { XOverlay: XOverlay },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 200
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    mainBtnColor: {
      type: String,
      default: '#EE9900'
    },
    secondBtnColor: {
      type: String,
      default: '#666666'
    },
    showNoPrompt: {
      type: Boolean,
      default: false
    },
    noPromptText: {
      type: String,
      default: '不再提示'
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    noPromptIcon: UN_CHECKED,
    pageHeight: 1334
  }),
  created () {
    // const { env: { deviceHeight, deviceWidth }} = weex.config;
    // this.pageHeight = deviceHeight / deviceWidth * 750;
  },
  methods: {
    overlayBodyClicked () {
      this.$emit('XDialogOverlayBodyClicked');
    },
    secondaryClicked () {
      this.$emit('XDialogCancelBtnClicked', {
        type: 'cancel'
      });
    },
    primaryClicked (e) {
      this.$emit('XDialogConfirmBtnClicked', {
        type: 'confirm'
      });
    },
    noPromptClicked (e) {
      const isChecked = !this.isChecked;
      this.noPromptIcon = isChecked ? CHECKED : UN_CHECKED;
      this.$emit('XDialogNoPromptClicked', { isChecked });
    }
  }
};
</script>
