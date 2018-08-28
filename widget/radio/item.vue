<template>
  <XCell :has-top-border="hasTopBorder"
            :cell-style="{backgroundColor:backgroundColor}"
            @xCellClicked="xCellClicked"
            :accessible="true"
            :aria-label="`${title},状态为${checked?'已选中':'未选中'},${disabled?'不可更改':''}`">
    <text :style="{color:color}"
          class="title-text"
          slot="title">{{title}}</text>
    <image :src="radioIcon"
           v-if="radioIcon"
           slot="value"
           class="radio"/>
  </XCell>
</template>

<style scoped>
  .radio {
    width: 48px;
    height: 48px;
  }

  .title-text {
    font-size: 30px;
  }
</style>

<script>
  import XCell from '../cell/index.vue';
  import { CHECKED, DISABLED } from './type.js'

  export default {
    components: { XCell },
    props: {
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        require: true
      },
      value: {
        type: [String, Number, Object],
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      icon: [CHECKED, DISABLED]
    }),
    computed: {
      radioIcon () {
        const { icon, disabled, checked, config } = this;
        const mergeIcon = icon;
        config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
        config.disabledIcon && (mergeIcon[1] = config.disabledIcon);
        return checked ? mergeIcon[disabled ? 1 : 0] : '';
      },
      backgroundColor () {
        const { disabled } = this;
        return disabled ? '#F2F3F4' : '#FFFFFF';
      },
      color () {
        const { disabled, checked, config } = this;
        let checkedColor = '#EE9900';
        config.checkedColor && (checkedColor = config.checkedColor);
        return checked && !disabled ? checkedColor : '#3D3D3D';
      }
    },
    methods: {
      xCellClicked () {
        const { disabled, value } = this;
        if (!disabled) {
          this.$emit('wxcRadioItemChecked', { value, disabled })
        }
      }
    }
  }
</script>
