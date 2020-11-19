<template>
  <div>
    <p>{{obj}}</p>
    <v-btn @click="deepMerge(obj1, obj2)"> 
      (obj1, obj2)
    </v-btn>
    <v-btn @click="deepMerge(obj3, obj4)"> 
      (obj3, obj4)
    </v-btn>
    <v-btn @click="deepMerge(obj5, obj6)"> 
      (obj5, obj6)
    </v-btn>
    <v-btn @click="deepMerge(obj7, obj8)"> 
      (obj7, obj8)
    </v-btn>
    <v-btn @click="deepMerge(arr1, arr2)"> 
      (arr1, arr2)
    </v-btn>
    <v-btn @click="deepMerge(val1, val2)"> 
      (val1, val2)
    </v-btn>
    <v-btn @click="deepMerge(x, y)"> 
      (x, y)
    </v-btn>
  </div>
</template>

<script>
import merge from 'deepmerge'

export default {
  data(){
    return{
      obj: {},

      obj1: { b:[{x:2, y:3}] },
      obj2: { b:[{x:4, y:5}] },
      obj3: { id: {b:10} },
      obj4: { id: {b:20} },
      obj5: { x: 10 },
      obj6: { y: 20 },
      obj7: { a: [10],  b:30, c:50},
      obj8: { a: [20],  b:400, d:600},
      arr1: [1,2,[3]],
      arr2: [9,8,[7]],
      val1: {width: '50%'},
      val2: {width: '33%'},
      x:{
        foo: { bar: 3 },
        array: [{
          does: 'work',
          too: [ 1, 2, 3 ]
        }]
      },
      y:{
        foo: { baz: 4 },
        quux: 5,
        array: [{
            does: 'work',
            too: [ 4, 5, 6 ]
        }, {
            really: 'yes'
        }]
      }

    }
  },
  methods:{
    deepMerge(a, b){
      this.obj =  merge(a,b)
    }
  }
}
</script>