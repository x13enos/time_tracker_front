import GlobalMethods from '@/services/global_methods';

it('should return true if passed value is undefined', () => {
  expect(GlobalMethods.isEmpty(undefined)).to.be.true
})

it('should return true if passed value is null', () => {
  expect(GlobalMethods.isEmpty(null)).to.be.true
})

it('should return true if passed value is empty string', () => {
  expect(GlobalMethods.isEmpty("")).to.be.true
})

it('should return true if passed value is empty array', () => {
  expect(GlobalMethods.isEmpty([])).to.be.true
})

it('should return true if passed value is empty object', () => {
  expect(GlobalMethods.isEmpty()).to.be.true
})

it('should return false if passed value is digit', () => {
  expect(GlobalMethods.isEmpty(1)).to.be.false
})

it('should return false if passed value is string', () => {
  expect(GlobalMethods.isEmpty("1")).to.be.false
})

it('should return false if passed value is array with elements', () => {
  expect(GlobalMethods.isEmpty([1])).to.be.false
})

it('should return false if passed value is objects with data', () => {
  expect(GlobalMethods.isEmpty({ key: "value" })).to.be.false
})
