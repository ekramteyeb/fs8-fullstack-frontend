function countValley(steps, path){
  let valley = 0;
  let pattern = /[^CD]/
  let result = pattern.test(path)

  console.log(valley, result)
}
countValley(1, 'CDD')