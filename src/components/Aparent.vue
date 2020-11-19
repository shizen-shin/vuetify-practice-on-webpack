<template>
  <v-app>
    <Sync />
  </v-app>
</template>

<script>
import Sync from "./Sync"
import TmpTr from "./TmpTr"
import TmpTrTd from "./TmpTrTd"
import TmpMethods from "./TmpMethods"
import TmpVfor from "./TmpVfor"
import TmpSlice from "./TmpSlice"
import TmpTableAdd from "./TmpTableAdd"
import TmpProps from "./TmpProps"
import TmpAddRow from "./TmpAddRow"
import TmpAddColumn from "./TmpAddColumn"
import TmpComputed from "./TmpComputed"
import TmpRemoveRow from "./TmpRemoveRow"
import TmpRemoveColumn from "./TmpRemoveColumn"
import TmpRowSpan from "./TmpRowSpan"
import TmpNullTest from "./TmpNullTest"
import TmpCompMethod from "./TmpCompMethod"
import TmpObjRename from "./TmpObjRename"
import jsParents from "./jsParents"
import TmpSwitch from "./TmpSwitch"
import TmpArgs from "./TmpArgs"
import setCorrectColNum from "./setCorrectColNum"
import GetSet from "./GetSet"
import GetSet2 from "./GetSet2"
import deepMerge from "./deepMerge"
import setterWatch1 from "./setterWatch1" 
import cellMerge from "./cellMerge"
import vBtnToggle from "./vBtnToggle"
import vBtnToggle2 from "./vBtnToggle2"
import inner from "./inner"
import shortHandProp from "./shortHandProp"
import transformation from "./transformation"

export default {
  name: "Parent",
  components:{
    Sync,
    transformation,
    shortHandProp,
    inner,
    TmpTr,
    TmpTrTd,
    TmpMethods,
    TmpVfor,
    TmpSlice,
    TmpTableAdd,
    TmpProps,
    TmpAddRow,
    TmpAddColumn,
    TmpComputed,
    TmpRemoveRow,
    TmpRemoveColumn,
    TmpRowSpan,
    TmpNullTest,
    TmpCompMethod,
    TmpObjRename,
    jsParents,
    TmpSwitch,
    TmpArgs,
    setCorrectColNum,
    GetSet,
    GetSet2,
    deepMerge,
    setterWatch1,
    cellMerge,
    vBtnToggle,
    vBtnToggle2,
  },
  data(){
    return{
      text:"Stringです",
      numbers: 12345,
      // arrs: ["a", "b", "c"],
      obj: {"a":1,"b":2,"c":3}
    }
  }
}
</script>