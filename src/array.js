export function newArray(count, callback){
  //return new Array(count).fill().map((e, i) => callback(i));
  var array = [];
  for (var i = 0; i < count; i++) {
    array[i] = callback(i);
  }
  return array;
}
