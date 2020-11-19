<template>
  <div>
      <v-btn v-for="btn in btns" 
        :key="btn.id"
        :disabled="!btn.isActive({a: b})"
        >
        {{btn.text}}
      </v-btn>
  </div>
</template>

<script>
import btns from "./TmpArgsChild"

export default {
  data(){
    return{
      //jsのbtnsをvueに変換
      btns: btns,

      a: 10,
    }
  },
  computed:{
    b(){return this.a/2}
  }
}
</script>