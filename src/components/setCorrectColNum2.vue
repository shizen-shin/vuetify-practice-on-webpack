<template>
  <v-text-field v-model="internalValue.width"
    single-line
    dense
    hide-details/>
</template>

<script>
import deepmerge from 'deepmerge'

export default {
  props: {
    value: {},
  },
  data() {
    return {
      internalValue: undefined,
    }
  },
  // watch: {
  //   value: {
  //     immediate: true,
  //     handler(val) {
  //       this.internalValue = deepmerge({
  //         width: '50%',
  //       }, val)
  //     }
  //   }
  // },

  methods: {
    applyChanges() {
      const col = {...this.internalValue}
      // this.$emit('input', col)
      this.$emit('change', col)
    },
  }
}
</script>