const calcA = (({a}) => a > 5 )
const calcB = (({a}) => a < 5 )
const calcC = (({a}) => a == 5 )
const calcD = (({a}) => a == 10 )

const btns = [
  {
  cmd: 'methodA',
  text: "aaa",
  isActive: calcA,
  },
  {
  cmd: 'methodB',
  text: "bbb",
  isActive: calcB,
  },
  {
  cmd: 'methodC',
  text: "ccc",
  isActive: calcC,
  },
  {
  cmd: 'methodD',
  text: "ddd",
  isActive: calcD,
  },
]

export default btns