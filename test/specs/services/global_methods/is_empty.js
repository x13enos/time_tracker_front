import test from 'ava';
import GlobalMethods from '@/services/global_methods';

test("it should return true if passed value is undefined", t => {
  t.truthy(GlobalMethods.isEmpty(undefined))
})

test("it should return true if passed value is null", t => {
  t.truthy(GlobalMethods.isEmpty(null))
})

test("it should return true if passed value is empty string", t => {
  t.truthy(GlobalMethods.isEmpty(""))
})

test("it should return true if passed value is empty array", t => {
  t.truthy(GlobalMethods.isEmpty([]))
})

test("it should return true if passed value is empty object", t => {
  t.truthy(GlobalMethods.isEmpty({}))
})

test("it should return false if passed value is digit", t => {
  t.false(GlobalMethods.isEmpty(1))
})

test("it should return false if passed value is string", t => {
  t.false(GlobalMethods.isEmpty("1"))
})

test("it should return false if passed value is array with elements", t => {
  t.false(GlobalMethods.isEmpty([1]))
})

test("it should return false if passed value is objects with data", t => {
  t.false(GlobalMethods.isEmpty({ key: "value" }))
})
