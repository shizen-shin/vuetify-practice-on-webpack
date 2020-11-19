<template>
  <div>
      <v-btn v-for="btn in btns" 
        :key="btn.id"
        @click="btnClicked(btn)">
        {{btn.text}}
      </v-btn>
      <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      btns:[
        {
        cmd: 'methodA',
        text: "aaa",
        },
        {
        cmd: 'methodB',
        text: "bbb",
        },
        {
        cmd: 'methodC',
        text: "ccc",
        },
        {
        cmd: 'methodD',
        text: "ddd",
        },
      ],
      message: "not clicked"
    }
  },
  methods:{
    btnClicked(command){
      switch(command.cmd){
        case 'methodA':
          console.log('Aclicked')
          this.methodA()
          break
        case 'methodB':
          console.log('Bclicked')
          this.methodB()
          break
        default:
          this.methodOthers()
      }
    },
    methodA(){
      this.message = "AisClicked"
    },
    methodB(){
      this.message = "BisClicked"
    },
    methodOthers(){
      this.message = "othersClicked"
    }
  }
}
</script>