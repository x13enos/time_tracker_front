
import GlobalMethods from '@/services/global_methods';

it('should return true if passed value is undefined', () => {
  t.truthy(GlobalMethods.isEmpty(undefined))
})

it('should return true if passed value is null', () => {
  t.truthy(GlobalMethods.isEmpty(null))
})

it('should return true if passed value is empty string', () => {
  t.truthy(GlobalMethods.isEmpty(""))
})

it('should return true if passed value is empty array', () => {
  t.truthy(GlobalMethods.isEmpty([]))
})

it('should return true if passed value is empty object', () => {
  t.truthy(GlobalMethods.isEmpty({}))
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
