<template>
      <div>
        <table>
          <tr>
            <td v-for="(col, idx) in innerCols" :key="idx">
              <TmpField
                v-model="innerCols[idx]"
                @change="onInnerColChange"/>
            </td>
          </tr>
        </table>
      </div>
</template>

<script>
import TmpField from "./TmpField.vue"

export default {
  components:{
    TmpField
  },
  data(){
    return{
      cols: [
        {
          width: '33%',
        },
        {
          width: '33%',
        },
        {
          width: '33%',
        },
      ],
    }
  },
  computed:{
    innerCols:{
      get(){
        return this.cols
      },
      set(val){
        this.$emit("updateCols", val)
      }
    }
  },
  methods:{
    onInnerColChange(e) {
      this.innerCols = [...this.innerCols]
    }
  }
}
</script>