<template>
  <v-card
    flat
    class="py-12"
  >
    <v-card-text>
      <v-row
        align="center"
        justify="center"
      >

      <v-col cols="12">
          <p class="text-center">
            selectedMsg: {{selectedMsg}}
          </p>
        </v-col>


        <v-btn-toggle
          v-model="selected"
          multiple
        >
          <v-btn v-for=" btn in btns" 
            :key="btn.id"
            :value="btn.msg"
            >
            <v-icon>{{btn.icon}}</v-icon>
            <span>{{btn.msg}}</span>
          </v-btn> 
        </v-btn-toggle>

      </v-row>
    </v-card-text>
  </v-card>
</template>


<script>
  export default {
    data () {
      return {
        selectedMsg: undefined,
        btns:[
          { icon:'mdi-format-align-left', msg:'aaa'},
          { icon:'mdi-format-align-center', msg:'bbb'},
          { icon:'mdi-format-align-right', msg:'ccc'},
          { icon:'mdi-format-align-justify', msg:'ddd'},
        ]
      }
    },
    computed:{
      selected: {
        get(){
          return this.value
        },
        set(x){
          this.selectedMsg = x
        }
      }
    }

  }
</script>