<template>
  <div>
    <xRadio v-for="(item,i) in updateList"
               :config="config"
               v-bind="item"
               @xRadioItemChecked="xRadioListChecked(i,$event)"
               :key="i"></xRadio>
  </div>
</template>

<style scoped>

</style>

<script>
  import xRadio from './item.vue';

  export default {
    components: { xRadio },
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
      checkedIndex: -1
    }),
    computed: {
      updateList () {
        const { checkedIndex, list } = this;
        const updateList = [];
        list && list.forEach((item, i) => {
          item.checked = i === checkedIndex;
          updateList.push(item);
        });
        return updateList;
      }
    },
    watch: {
      list (newList) {
        this.setListChecked(newList);
      }
    },
    created () {
      this.setListChecked(this.list);
    },
    methods: {
      setListChecked (list) {
        if (list && list.length > 0) {
          list.forEach((item, i) => {
            item.checked && (this.checkedIndex = i);
          });
        }
      },
      xRadioListChecked (i, e) {
        const oldIndex = this.checkedIndex;
        const { value, title } = this.list[i];
        this.checkedIndex = i;
        this.$emit('xRadioListChecked', { value, title, oldIndex, index: i })
      }
    }
  }
</script>
