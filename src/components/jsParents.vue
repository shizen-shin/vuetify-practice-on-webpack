<template>
  <div>
    <p>added </p>
    {{price}}
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