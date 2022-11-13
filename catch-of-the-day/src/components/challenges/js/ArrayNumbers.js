// accept array
// return true if the sum of the array is greater than the highest multiple of two numbers in the array
// return false if the sum of the array is less than the highest multiple of two numbers in the array

function ArrayChallenge(arr) {
  function doubleSumArray(arr) {
    const sum = arr.reduce((acc, cur) => acc + cur, 0) * 2
    return sum
  }

  function highestMultiple(arr) {
    arr.sort(function (a, b) {
      return b - a
    })
    return arr[0] * arr[1]
  }

  console.log(arr)
  console.log('doublesum: ' + doubleSumArray(arr))
  console.log('highestMultiple: ' + highestMultiple(arr))

  if (doubleSumArray(arr) < highestMultiple(arr)) return true
  else return false
}

const arr1 = [2, 2, 2, 3, 4, 1]
const arr2 = [1, 1, 2, 10, 3, 1, 12]
console.log(ArrayChallenge(arr1))
console.log(ArrayChallenge(arr2))

// keep this function call here
// console.log(ArrayChallenge(readline()))
