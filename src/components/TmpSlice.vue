<template>
  <div>
    <div>
      <p>{{arrs}}</p>
      <p>arrs.slice(0,2) : {{arrs.slice(0,2)}}</p>
      <p>arrs.slice(2,4) : {{arrs.slice(2,4)}}</p>
      <p>arrs.slice(4,5) : {{arrs.slice(4,5)}}</p>
      <p>arrs.slice(2) : {{arrs.slice(2)}}</p>
    </div>
    <div>
      <button
      @click="sliceMerge()"
      >click me</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      arrs:["aaa","bbb","ccc","ddd","eee"]
    }
  },
  methods:{
    sliceMerge(){
      const cutId = 1
      
      this.arrs = [
        ...this.arrs.slice(0, cutId),
        ...this.arrs.slice(cutId + 1)
      ]

      console.log(this.arrs)
    }
  }
}
</script>