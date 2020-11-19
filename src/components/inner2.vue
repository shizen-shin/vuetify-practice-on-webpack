<template>
  <div>
    <p v-for="item in items" :key="item.id">
      {{item}}
    </p>
  </div>
</template>

<script>
export default {
  props:{
    items: undefined
  }
}
</script>