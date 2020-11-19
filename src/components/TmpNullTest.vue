<template>
  <div>
    <p>null test</p>
    <p>・arr:{{arr}}</p>
    <p>・arr[0]:{{arr[0]}}</p>
    <p v-if="Boorean(arr) && arr.length > 0">
      ・arr[0].aaa:{{arr[0].aaa}}
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      arr:[]
    }
  }
}
</script>


