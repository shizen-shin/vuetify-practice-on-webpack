<template>
  <div>
    {{price}}
    <p>added</p>
  </div>
</template>

<script>
import totalPrice from "./jsTotalPrice" 

export default {
  data(){
    return{
      price: totalPrice + "円",
    }
  }
}
</script>