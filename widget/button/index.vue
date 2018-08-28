<template>
  <div :class="['wxc-btn','wxc-btn-'+type,'wxc-btn-'+size,disabled?'wxc-btn-disabled':'']"
      @click="onClicked"
      :accessible="true"
      :aria-label="text"
      >
      <text :class="['btn-text','btn-text-'+type,'btn-text-'+size]">{{text}}</text>
  </div>
  <!-- 测试 -->
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '确认'
      },
      size: {
        type: String,
        default: 'none'
      },
      type: {
        type: String,
        default: 'red'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disabledStyle: Object
    },
    data () {
      return {
        btnStyle: {
          backgroundColor: '#FFFFFF',
          borderColor: '#A5A5A5',
          borderWidth: '2px',
          opacity: '1',
          height: '88px',
          width: '702px'
        },
        textStyle: {
          color: '#FFFFFF',
          fontSize: '28px'
        }
      }
    },
    methods: {
      onClicked (e) {
        const { type, disabled } = this;
        this.$emit('xButtonClicked', { e, type, disabled });
      }
    }
  };
</script>

<style scoped>
  .wxc-btn {
    box-sizing: border-box;
    display: flex;
    width: 702px;
    height: 88px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    opacity: 1;
  }
  .btn-text {
    text-overflow: ellipsis;
    lines: 1;
    font-size: 36px;
    color: #3D3D3D;
  }
  .wxc-btn-disabled {
    opacity: 0.2
  }
  

  .wxc-btn-red {
    background-color: #FF5000
  }
  .wxc-btn-yellow {
    background-color: #FFC900
  }
  .wxc-btn-white {
    background-color: #FFFFFF;
    border-color: #A5A5A5;
    border-width: 2px;
    border-style: solid;
  }
  .wxc-btn-blue {
    background-color: #0F8DE8
  }
  .wxc-btn-green {
    background-color: #19be6b
  }
  /* .wxc-btn-white.disabled {
    background-color: rgba(0, 0, 0, 0.1);
  } */
 
  .btn-text-red {
    color: #FFFFFF
  }
  .btn-text-yellow {
    color: #FFFFFF
  }
  .btn-text-white {
    color: #3D3D3D
  }
  .btn-text-blue {
    color: #FFFFFF
  }
  .btn-text-green {
    color: #FFFFFF
  }

  .wxc-btn-full {
    width: 702px;
    height: 88px;
  }
  .wxc-btn-big {
    width: 339px;
    height: 70px;
  }
  .wxc-btn-medium {
    width: 218px;
    height: 60px;
  }
  .wxc-btn-small {
    width: 157px;
    height: 44px;
  }
  
  .btn-text-full{
    font-size: 36px
  }
  .btn-text-big{
    font-size: 32px
  }
  .btn-text-medium{
    font-size: 28px
  }
  .btn-text-small{
    font-size: 24px
  }
</style>
