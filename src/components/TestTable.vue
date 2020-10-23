<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
      <tr class="v-data-table">
        <!-- <td><TableCol></TableCol></td> -->
      </tr>
      <tr>
        <td><v-text-field></v-text-field></td>
        <td><v-text-field></v-text-field></td>
        <td><v-text-field></v-text-field></td>
      </tr>
      <tr
        v-for="item in items"
        :key="item.large"
      >
        <td>{{ item.large }}</td>
        <td>{{ item.small }}</td>
        <td>1</td>
      </tr>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import TableCol from "./Col"

export default {
  components: {
    // VrNormalBtn,
    TableCol,
  },
  data(){
    return {
      items:[
        {
         large: 'AAA',
         small: 'aaa',
         },
         {
         large: 'BBB',
         small: 'bbb',
         },
      ]
    }
  }
}
</script>

<style lang="css" scoped>
table td{
  border: 1px solid;
  color: blue;
  text-align: center;
}
</style>