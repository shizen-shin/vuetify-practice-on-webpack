<template>
  <inner2 :items="arrs" />
</template>

<script>
import inner2 from "./inner2"

export default {
  components:{
    inner2
  },
  data(){
    return{
      arrs:[1,2,3,4,5]
    }
  }
}
</script>