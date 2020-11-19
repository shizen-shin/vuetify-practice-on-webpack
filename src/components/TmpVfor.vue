<template>
  <div>
    <ul>
      <template v-for="(arr, index) in arrs">
        <li :key="index">
          {{arr}}：{{index}}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      arrs:["aaa","bbb","ccc","ddd","eee"]
    }
  }
}
</script>