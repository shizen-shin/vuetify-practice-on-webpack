<template>
  <div>
    <p>・価格（税抜き）: <input type="text" v-model="price" size=5>円</p>
    <p>・価格（税込み）: {{computedPrice}}　円　--computed--</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      price: 100
    }
  },
  computed:{
    computedPrice(){
      return Math.floor(this.price * 1.10) 
    }
  }
}
</script>