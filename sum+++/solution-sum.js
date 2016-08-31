var sum = function(array, ind) {


  if (ind < array.length) {
    return array[ind] + sum(array, ind + 1);
  } else {
    return 0;
  }

}

  var summe = 0
  var count = 0


summe = summe + sum([[1, 2, 3]], count);

console.log(summe);