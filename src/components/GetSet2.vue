<template>
  <div>
    <template v-for="(val, idx) in values"> 
      <input :key="idx" v-model="innerValues[idx].text">

      <p>・変数valueの中身： {{innerValues[idx]}}</p>
    </template>

    <p>values:{{values}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      values: [
        {text: 'aaa'},
        {text: 'bbb'},
        {text: 'ccc'},
      ]
    }
  },
  computed:{
    innerValues:{
      get(){
        return this.values
      },
      set(x){
        this.values = x
      }
    }
  }
}
</script>