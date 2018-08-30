<template>
  <div>
    <div class="x-overlay"
         ref="x-overlay"
         v-if="show"
         :hack="shouldShow"
         @click="overlayClicked"
         :style="{opacity: ( hasAnimation && hasWeed )  ? 0 : 1,backgroundColor: 'rgba(0, 0, 0,'+opacity+')'}">
    </div>
  </div>
</template>

<style scoped>
  .x-overlay {
    width: 750px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<script>
let animation;
if (typeof (weex) === 'object') {
  animation = weex.requireModule('animation');
} else {
  console.error('weex is not defined');
  animation = false;
}
export default {
  data () {
    return {
      hasWeed: true
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: Array,
      default: () => (['ease-in', 'ease-out'])
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    },
    canAutoClose: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    overlayStyle () {
      return {

        backgroundColor: `rgba(0, 0, 0,${this.opacity})`
      }
    },
    shouldShow () {
      const { show, hasAnimation } = this;
      hasAnimation && setTimeout(() => {
        this.appearOverlay(show);
      }, 50);
      return show;
    }
  },
  created () {
    this.hasWeed = !!animation
  },
  methods: {
    overlayClicked (e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('xOverlayBodyClicked', {});
    },
    appearOverlay (bool, duration = this.duration) {
      const { hasAnimation, timingFunction, canAutoClose } = this;
      const needEmit = !bool && canAutoClose;
      const overlayEl = this.$refs['x-overlay'];
      needEmit && (this.$emit('xOverlayBodyClicking', {}));
      if (hasAnimation && overlayEl && animation) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, () => {
          needEmit && (this.$emit('xOverlayBodyClicked', {}));
        });
      } else {
        needEmit && (this.$emit('xOverlayBodyClicked', {}));
      }
    }
  }
};
</script>
