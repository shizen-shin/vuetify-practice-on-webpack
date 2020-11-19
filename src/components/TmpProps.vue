<template>
  <div>
    <p>text: {{text}}</p>
    <p>numbers: {{numbers}}</p>
    <p>arrs: {{arrs}}</p>
  </div>
  
</template>

<script>
export default {
  props:{
    text: {type:String, default:"デフォルト設定です"},
    numbers: {type:[Number], default:100},
    arrs: {type:[Array], default:()=>[1,2,3], required:true},
  }
}
</script>