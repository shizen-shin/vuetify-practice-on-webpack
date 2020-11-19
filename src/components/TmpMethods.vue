<template>
  <div>
    <v-btn @click="showConsole1">
      {{text}}1
    </v-btn>

    <br>
    
    <v-btn @click="showConsole2">
      {{text}}2
    </v-btn>
    
    <br>
    
    <v-btn @click="showConsole3">
      {{text}}3
    </v-btn>
  </div>
</template>

<script>
export default {
  data(){
    return{
      text: "ボタン"
    }
  },
  methods:{
    showConsole1(){
      console.log("showConsole1：", this.text)
    },
    showConsole2:function(){
      console.log("showConsole2：", this.text)
    },
    showConsole3:()=>{
      console.log("showConsole3：", this.text)
    }
  }
}
</script>