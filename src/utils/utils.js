export const getCombinations = (str) => {
    const words = str.toLowerCase().split(' ');
  
    const combine = (arr) => {
      const result = [];
      const f = (prefix, arr) => {
        for (let i = 0; i < arr.length; i++) {
          result.push(prefix + arr[i]);
          f(prefix + arr[i] + ' ', arr.slice(i + 1));
        }
      };
      f('', arr);
      return result;
    }
  
    const combinations = combine(words);
  
    return combinations;
  }