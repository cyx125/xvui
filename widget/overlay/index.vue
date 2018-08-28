<template>
  <div>
    <div class="wxc-overlay"
         ref="wxc-overlay"
         v-if="show"
         :hack="shouldShow"
         @click="overlayClicked"
         :style="{backgroundColor: 'rgba(0, 0, 0,'+opacity+')'}">
    </div>
  </div>
</template>

<style scoped>
  .wxc-overlay {
    opacity: 1;
    width: 750px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<script>
export default {
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
    }
  },
  computed: {
    overlayStyle () {

    },
    shouldShow () {
      const { show } = this;
      return show;
    }
  },
  methods: {
    overlayClicked (e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
    },
    appearOverlay (bool, duration = this.duration) {
      const { canAutoClose } = this;
      const needEmit = !bool && canAutoClose;
      needEmit && (this.$emit('wxcOverlayBodyClicking', {}));
      needEmit && (this.$emit('wxcOverlayBodyClicked', {}));
    }
  }
};
</script>
