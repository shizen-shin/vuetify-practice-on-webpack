<template>
  <div>
    <childTemplate v-model="text" />
  </div>
</template>

<script>
import childTemplate from "./setterWatch2"

export default {
  components:{
    childTemplate
  },
  data(){
    return {
      text: 'Default message'
    }
  }
}
</script>