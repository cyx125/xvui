<template>
 <div :class="['x-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border','cell-indent']"
    :accessible="true"
      :aria-label="title + ',状态为' + checked?'已选中':'未选中' + ',' +disabled?'不可更改':'' + '}' "
    @click="xCellClicked">
    <div class="cell-title">
    <text :style="{color:textColor}"
          class="title-text"
          slot="title">{{title}}</text>
    </div>
    <image :src="checkIcon"
           class="checkbox"></image>
  </div>
</template>

<style scoped>
  .checkbox {
    width: 48px;
    height: 48px;
  }

  .title-text {
    font-size: 30px;
  }

  .x-cell {
    /*height: 100px;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    background-color: #ffffff;
  }

  .cell-margin {
    margin-bottom: 24px;
  }

  .cell-title {
    flex: 1;
  }

  .cell-indent {
    padding-bottom: 30px;
    padding-top: 30px;
  }

  .cell-top-border {
    border-top-color: #e2e2e2;
    border-top-width: 2px;
    border-top-style: solid;
  }

  .cell-bottom-border {
    border-bottom-color: #e2e2e2;
    border-bottom-width: 2px;
    border-bottom-style: solid;
  }

</style>

<script>
  import { CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED } from './type'

  export default {
    props: {
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      hasBottomBorder: {
        type: Boolean,
        default: true
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
      icon: [CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false
    }),
    computed: {
      checkIcon () {
        const { icon, disabled, innerChecked, config } = this;
        const mergeIcon = [...icon];
        config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
        config.unCheckedIcon && (mergeIcon[1] = config.unCheckedIcon);
        config.checkedDisabledIcon && (mergeIcon[2] = config.checkedDisabledIcon);
        config.unCheckedDisabledIcon && (mergeIcon[3] = config.unCheckedDisabledIcon);
        if (disabled) {
          return mergeIcon[innerChecked ? 2 : 3];
        } else {
          return mergeIcon[innerChecked ? 0 : 1];
        }
      },
      textColor () {
        const { innerChecked, disabled, config } = this;
        const checkedColor = config.checkedColor ? config.checkedColor : '#EE9900';
        return innerChecked && !disabled ? checkedColor : '#3D3D3D';
      }
    },
    watch: {
      checked (newChecked) {
        this.innerChecked = newChecked;
      }
    },
    created () {
      const { checked } = this;
      this.innerChecked = checked;
    },
    methods: {
      xCellClicked () {
        const { disabled, innerChecked, value } = this;
        if (!disabled) {
          this.innerChecked = !innerChecked;
          this.$emit('xCheckBoxItemChecked', { value, checked: this.innerChecked })
        }
      }
    }
  }
</script>
