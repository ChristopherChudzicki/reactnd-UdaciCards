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
