<template>
  <div>
    <p>selected: {{selected}}</p>
    <p>currentMsg: {{currentMsg}}</p>
    
    <v-btn-toggle 
      v-model="selected"
    >
          <v-btn v-for="btn in btns"
            :key="btn.id"
            :value="btn.msg"
          >
            <v-icon>{{btn.icon}}</v-icon>
          </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentMsg: undefined,
      btns:[
          { icon:'mdi-format-align-left', msg:'aaa'},
          { icon:'mdi-format-align-center', msg:'bbb'},
          { icon:'mdi-format-align-right', msg:'ccc'},
          { icon:'mdi-format-align-justify', msg:'ddd'},
        ]
    }
  },
  computed:{
    selected:{
      get(){
        return this.currentMsg
      },
      set(x){
        this.currentMsg = x
      }
    }
  }
}
</script>