<template>
  <div :class="['x-cell', hasTopBorder && 'cell-top-border','cell-bottom-border', 'cell-indent']"
      :style="{backgroundColor:backgroundColor}"
      :accessible="true"
      :aria-label="title + ',状态为' + checked?'已选中':'未选中' + ',' +disabled?'不可更改':'' + '}' "
      @click="xCellClicked">
      <div class="cell-title">
        <text :style="{color:color}" class="title-text">{{title}}</text>
      </div>
      <image 
            :src="radioIcon"
            v-if="radioIcon"
            class="radio"/>  
  </div>
</template>

<style scoped>
  .radio {
    width: 42px;
    height: 42px;
  }

  .title-text {
    font-size: 30px;
    line-height:42px;
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
    created () {
    },
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
      cellClicked (e) {
        // const link = this.link;
        this.$emit('xCellClicked', { e });
        // link && XUtil.goToH5Page(link, true);
      },
      xCellClicked () {
        const { disabled, value } = this;
        if (!disabled) {
          this.$emit('xRadioItemChecked', { value, disabled })
        }
      }
    }
  }
</script>
