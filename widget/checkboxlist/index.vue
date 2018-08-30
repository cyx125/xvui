<template>
  <div>
    <x-checkbox v-for="(item,i) in list"
      v-bind="item"
      :config="config"
      @xCheckBoxItemChecked="xCheckBoxItemChecked"
      :key="i"></x-checkbox>
  </div>
</template>

<script>
  import XCheckbox from '../checkbox/index.vue';

  export default {
    components: { XCheckbox },
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      checkedList: []
    }),
    created () {
      const { list } = this;
      if (list && list.length > 0) {
        list.forEach((item, i) => {
          item.checked && this.checkedList.push(item.value);
        });
      }
    },
    methods: {
      xCheckBoxItemChecked (e) {
        if (e.checked) {
          this.checkedList.push(e.value);
        } else {
          const index = this.checkedList.indexOf(e.value);
          this.checkedList.splice(index, 1);
        }
        this.$emit('xCheckBoxListChecked', { checkedList: this.checkedList })
      }
    }
  }
</script>
