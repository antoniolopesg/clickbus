function sum(a: number, b: number){
  return a + b;
}

test('if i call sum function with 4 and 5 it should return 9', () => {
  expect(sum(4, 5)).toBe(9);
});