let ar = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]

function findMatchIndex(obj, arr) {
  let i = 0
  for (let o of arr) {
    if (o._id === obj._id) return i
    i++
  }
  return -1
}

console.log(findMatchIndex({ _id: 3 }, ar))
