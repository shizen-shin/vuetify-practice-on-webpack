const jsMulti = ({A, B, x, y}) => {
  const _A = A * x
  const _B = B * y

  return {
    A: _A,
    B: _B
  }
}

const text = "this is js-file"

export default jsMulti
