<template>
  <div class="mt-5">
    <v-row
     align="center"
     justify="space-around"
     >
      <v-btn
      :disabled="isActive"
      >Test</v-btn>

    </v-row>

    <div>
        <p class="box" @click="selectClicked">true</p>
        <p class="box" @click="selectClicked">false</p>
    </div>
    
  </div>
</template>

<script>
export default {
  computed:{
    isActive(){
      return false
    }
  },
  methods:{
    selectClicked(){
      
    }
  }
}
</script>

<style language="css" scoped>
  div{
    margin: 0 auto;
  }
  .box{
    margin:10px 0;
    border: solid 1px lightgray;
    background:rgb(238, 237, 237);
    text-align: center;
    display: inline-block;
    width:60px;
  }
</style>