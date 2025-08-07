export function convertToRoman(num: number): string {
  if (num < 1 || num > 100) {
    throw new Error('Number must be between 1 and 100');
  }

  const values = [100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }
  
  return result;
}