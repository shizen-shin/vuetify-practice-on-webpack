<template>
  <!-- 渡すテンプレート -->
  <div>
    <!-- 親に戻すデータをv-modelで指定 -->
    <input type="text" :value="message" @input="$emit('update:message', $event.target.value)">
  </div>
</template>

<script>
export default {
  props:{
    message: {type:String}
  },
  // computed: {
  //   chiledMsg: {
  //     get() {
  //       return this.message;
  //     },
  //     set(newVal) {
  //       this.$emit('input', newVal);
  //     }
  //   }
  // }
}
</script>