<template>
  <v-tooltip open-delay="350" top>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on"
        small
        tile
        text
        :disabled="disabled"
        :color="command.color"
        @click="$emit('click', $event)">
        <v-icon>{{ command.icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ command.text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'VrNormalBtn',
  props: {
    value: { type: Boolean },
    disabled: { type: Boolean, default: false },
    command: { type: Object, required: true },
  },
}
</script>