<template>
  <v-text-field v-model="internalValue.width"
    @change="applyChanges"
    single-line
    dense
    hide-details>
  </v-text-field>
</template>

<script>
import deepmerge from 'deepmerge'
export default {
  name: 'TableCol',
  props: {
    value: {},
  },
  data() {
    return {
      internalValue: undefined,
      // value:{},
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.internalValue = deepmerge({
          width: '50%',
        }, val)
      }
    }
  },
  methods: {
    applyChanges() {
      const col = {...this.internalValue}
      this.$emit('input', col)
      this.$emit('change', col)
    },
  }
}
</script>
