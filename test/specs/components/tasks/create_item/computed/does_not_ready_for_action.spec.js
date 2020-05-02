import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const propsData = { activeDay: true, day: DateTime.local() }

it('should return true if project and description are empty and there is not active day ', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  Object.assign(wrapper.vm, { project: null, description: null })
  expect(wrapper.vm.doesNotReadyForAction).to.be.true
});

it('should return true if only project is present', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  wrapper.vm.project = '1'
  Object.assign(wrapper.vm, { project: "1", description: null })
  expect(wrapper.vm.doesNotReadyForAction).to.be.true
});

it('should return true if only description is present', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  Object.assign(wrapper.vm, { project: null, description: "1" })
  expect(wrapper.vm.doesNotReadyForAction).to.be.true
});

it('should return false if description and project are not empty', () => {
  const wrapper = createWrapper(task, { propsData }, fakeStoreData())
  Object.assign(wrapper.vm, { project: "1", description: "1" })
  expect(wrapper.vm.doesNotReadyForAction).to.be.false
});
