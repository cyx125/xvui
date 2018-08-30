<template>
    <div class="container" v-if="show">
        <x-overlay :show="show && hasOverlay"
            v-if="show"
            v-bind="mergeOverlayCfg"
            :can-auto-close="overlayCanClose"
            @xOverlayBodyClicking="xOverlayBodyClicking"
            @xOverlayBodyClicked="xOverlayBodyClicked"></x-overlay>
        <div ref="x-mask"
            class="x-mask"
            v-if="show"
            :hack="shouldShow"
            :style="{opacity: (hasAnimation && !opened) ? 0 : 1}"
            >
            <div class="x-mask-content">
                <slot></slot>
            </div>
            <div class="mask-bottom"
                @click="closeIconClicked"
                v-if="showClose">
                <image :src="closeIcon"
                    aria-label="关闭"
                    class="mask-close-icon"></image>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .container {
    position: fixed;
    width: 750px;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
  }
  
  .x-mask {
    position: fixed;
    width: 750px;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .x-mask-content{
    width: 702px;
    height: 700px;
    background-color: #fff;
  }
  .mask-bottom {
    width: 100px;
    height: 100px;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .mask-close-icon {
    width: 64px;
    height: 64px;
  }
</style>

<script>
import XOverlay from '../overlay/index.vue';
let animation;
if (typeof (weex) === 'object') {
  animation = weex.requireModule('animation');
} else {
  console.error('weex is not defined');
  animation = false;
}
export default {
  components: { XOverlay },
  props: {
    height: {
      type: [String, Number],
      default: 800
    },
    width: {
      type: [String, Number],
      default: 702
    },
    top: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: 300
    },
    hasOverlay: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    timingFunction: {
      type: Array,
      default: () => (['ease-in', 'ease-out'])
    },
    overlayCfg: {
      type: Object,
      default: () => ({
        hasAnimation: true,
        timingFunction: ['ease-in', 'ease-out'],
        canAutoClose: true,
        duration: 300,
        opacity: 0.6
      })
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    overlayCanClose: {
      type: Boolean,
      default: true
    },
    maskBgColor: {
      type: String,
      default: '#ffffff'
    }
  },
  data: () => ({
    closeIcon: 'https://gw.alicdn.com/tfs/TB1qDJUpwMPMeJjy1XdXXasrXXa-64-64.png',
    maskTop: 264,
    opened: false
  }),
  computed: {
    mergeOverlayCfg () {
      return {
        ...this.overlayCfg,
        hasAnimation: this.hasAnimation
      }
    },
    // maskStyle () {
    //   const { width, height, showClose, hasAnimation, opened, top } = this;
    //   const newHeight = showClose ? height - 0 + 100 : height;
    //   const { deviceHeight, deviceWidth, platform } = weex.config.env;
    //   const _deviceHeight = deviceHeight || 1334;
    //   const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';
    //   const navHeight = isWeb ? 0 : 130;
    //   const pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;
    //   return {
    //     width: width + 'px',
    //     height: newHeight + 'px',
    //     left: (750 - width) / 2 + 'px',
    //     top: (top || (pageHeight - height) / 2) + 'px',
    //     opacity: hasAnimation && !opened ? 0 : 1
    //   }
    // },
    shouldShow () {
      const { show, hasAnimation } = this;
      hasAnimation && setTimeout(() => {
        this.appearMask(show);
      }, 50);
      return show;
    }
  },
  methods: {
    closeIconClicked () {
      this.appearMask(false);
    },
    xOverlayBodyClicking () {
      if (this.hasAnimation) {
        this.appearMask(false);
        this.$emit('xOverlayBodyClicking', {});
      }
    },
    xOverlayBodyClicked () {
      if (!this.hasAnimation) {
        this.appearMask(false);
        this.$emit('xOverlayBodyClicked', {});
      }
    },
    needEmit (bool = false) {
      this.opened = bool;
      !bool && this.$emit('xMaskSetHidden', {});
    },
    appearMask (bool, duration = this.duration) {
      const { hasAnimation, timingFunction } = this;
      const maskEl = this.$refs['x-mask'];
      if (hasAnimation && maskEl && animation) {
        animation.transition(maskEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, () => {
          this.needEmit(bool);
        });
      } else {
        this.needEmit(bool);
      }
    }
  }
};
</script>