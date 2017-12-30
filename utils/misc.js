export function deckListSorter(deckA, deckB){
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  if (deckA.title < deckB.title){
    return -1
  }
  if (deckA.title > deckB.title){
    return 1
  }
  else {
    return 0
  }
}

export function range(n){
  const val = []
  for (let j=0; j<n;j++){
    val.push(j)
  }
  return val
}
