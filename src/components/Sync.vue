<template>
  <div>
    <!-- 子テンプレートを呼び出し、プロパティvalueで変数msgを共有 -->
    <SyncChiled :message.sync="msg" />

    <!-- 親で定義しているデータが変更されるかの確認用 -->
    ・変数msgを表示:　{{msg}}
  </div>
</template>

<script>
// import SyncChiled from "./SyncChiled" 

export default {
  components:{
    SyncChiled: () => import("./SyncChiled")
    //子テンプレをタグとして使えるようにする
  },
  data(){
    return{
      msg: "初期メッセージ"
    }
  }
}
</script>
