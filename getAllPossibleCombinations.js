"use strict";

/**
 * Get all possible combinations of multi dimensional array elements with variable length
 */
const getAllPossibleCombinations = (arr) => {
  const result = [];

  let finish = false;
  let globalIndex = 0;
  let curIndex = 0;
  let subarrIndex = 0;
  let maxLength = 0;
  for (const subarr of arr) {
    if (subarr.length > maxLength) {
      maxLength = subarr.length;
    }
  }

  while (!finish) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
      const subarr = arr[i];
      if (i === subarrIndex) {
	temp += subarr[curIndex];

	continue;
      }

      const div = subarr.length;
      const tempIndex = globalIndex && div ? globalIndex % div : 0;
      temp += subarr[tempIndex];
    }

    if (result.includes(temp)) {
      // next index of current sub array
      if ((arr[subarrIndex].length - 1) === curIndex) {
	if ((arr.length - 1) === subarrIndex) {
	  globalIndex++;
	  subarrIndex = 0;
	}
	else subarrIndex++;
	curIndex = 0;
      }
      else curIndex++;
    }
    else result.push(temp);

    temp = "";

    if (globalIndex === maxLength) {
      finish = true;
    }
  }

  return result;
}

console.log(getAllPossibleCombinations(process.argv.slice(2)));

module.exports = {
  getAllPossibleCombinations,
}
