<template>
  <div>
    <input v-model="childText">
    <p>・childText： {{childText}}</p>
  </div>
</template>

<script>
export default {
  props:{
    value: {}
  },
  data(){
    return{
      childText: undefined
    }
  },
  watch:{
    value:{
      immediate: true,
      handler(x){
        this.childText = x
      }
    }
  }
}
</script>