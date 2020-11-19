<template>
  <div>
    <input v-model="msg">
    <p>・変数valueの中身： {{value}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value: 'Default message'
    }
  },
  computed:{
    msg:{
      get(){
        return this.value
      },
      set(x){
        this.value = x
      }
    }
  }
}
</script>