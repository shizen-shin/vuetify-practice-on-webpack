<template>
  <div>
    <button
      @click="btnClicked"
    >【Click Me】</button>

    <p>・A:　{{A}}</p>
    <p>・B:　{{B}}</p>
    <!-- <p>・text:  {{text}}</p> -->

  </div>
</template>

<script>
import xxx from "./transformationJs"

export default {
  data(){
    return{
      A: 1,
      B: 2,
      x: 100,
      y: 200,
      // text: t,
    }
  },
  methods:{
    btnClicked(){
      const {A, B} = xxx({
        A: this.A,
        B: this.B,
        x: this.x,
        y: this.y
      })
      
      this.A = A
      this.B = B
    }
  }
}
</script>