<template>
    <v-btn
    elevation="2"
    rounded
    width="20%"
    @click="$emit('chiled-clicked', $event)"
    >
    ボタン
    </v-btn>
</template>

<script>
export default {
  props:{
    bind: {type:String},
  },
  methods:{
    ChildClicked(a){
      console.log(a)
    }
  },
  data(){
    return{
      child:"子テンプレートのボタンがクリックされました"
    }
  }
}
</script>